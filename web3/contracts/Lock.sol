// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionAdExchange is ERC721URIStorage, Ownable {
    uint256 public tokenCounter; // Token ID tracker
    uint256 constant MONTHLY_DURATION = 30 days;

    struct AdSpace {
        uint256 price;
        uint256 monthlyFee;
        address seller;
        address buyer;
        uint256 lastPaidTime;
        bool isActive;
    }

    mapping(uint256 => AdSpace) public adSpaces; // Store ad space details

    event AdSpaceListed(uint256 tokenId, uint256 price, uint256 monthlyFee, address seller);
    event AdSpaceBought(uint256 tokenId, address buyer, uint256 price);
    event MonthlyPaymentMade(uint256 tokenId, address buyer, uint256 monthlyFee);
    event AdSpaceReverted(uint256 tokenId, address seller);

    // Pass msg.sender to the Ownable constructor
    constructor() ERC721("SubscriptionAdSpace", "SADS") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    /**
     * @dev Mints a new Ad Space Token and lists it for sale with an initial price and monthly fee.
     * @param _tokenURI The metadata URI (e.g., ad space details).
     * @param _price The initial price for buying the ad space.
     * @param _monthlyFee The monthly fee to continue using the ad space.
     */
    function mintAdSpace(string memory _tokenURI, uint256 _price, uint256 _monthlyFee) external onlyOwner {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        adSpaces[newTokenId] = AdSpace({
            price: _price,
            monthlyFee: _monthlyFee,
            seller: msg.sender,
            buyer: address(0),
            lastPaidTime: 0,
            isActive: false
        });

        tokenCounter++;

        emit AdSpaceListed(newTokenId, _price, _monthlyFee, msg.sender);
    }

    /**
     * @dev Buyer purchases the ad space, ownership is transferred, and the first payment is made.
     * @param _tokenId The ID of the ad space token to buy.
     */
    function buyAdSpace(uint256 _tokenId) external payable {
        AdSpace storage adSpace = adSpaces[_tokenId];
        require(msg.value >= adSpace.price, "Insufficient payment.");
        require(adSpace.buyer == address(0), "Ad space already sold.");
        require(ownerOf(_tokenId) == adSpace.seller, "Seller is not the owner.");

        // Transfer token ownership and activate ad space
        adSpace.buyer = msg.sender;
        adSpace.isActive = true;
        adSpace.lastPaidTime = block.timestamp;

        _transfer(adSpace.seller, adSpace.buyer, _tokenId);

        emit AdSpaceBought(_tokenId, msg.sender, adSpace.price);
    }

    /**
     * @dev Buyer pays the monthly fee to continue using the ad space.
     * @param _tokenId The ID of the ad space token to pay for.
     */
    function payMonthlyFee(uint256 _tokenId) external payable {
        AdSpace storage adSpace = adSpaces[_tokenId];
        require(adSpace.buyer == msg.sender, "You are not the owner.");
        require(adSpace.isActive, "Ad space is not active.");
        require(block.timestamp >= adSpace.lastPaidTime + MONTHLY_DURATION, "Too early to pay.");
        require(msg.value >= adSpace.monthlyFee, "Insufficient monthly payment.");

        adSpace.lastPaidTime = block.timestamp;

        emit MonthlyPaymentMade(_tokenId, msg.sender, adSpace.monthlyFee);
    }

    /**
     * @dev Automatically checks if the buyer has failed to pay and reverts the ad space to the seller.
     * @param _tokenId The ID of the ad space token.
     */
    function revertAdSpace(uint256 _tokenId) public {
        AdSpace storage adSpace = adSpaces[_tokenId];
        require(adSpace.isActive, "Ad space is already inactive.");
        require(block.timestamp > adSpace.lastPaidTime + MONTHLY_DURATION, "Buyer still within payment window.");

        address previousBuyer = adSpace.buyer;
        adSpace.buyer = address(0); // Reset the buyer
        adSpace.isActive = false;

        // Transfer token ownership back to the seller
        _transfer(previousBuyer, adSpace.seller, _tokenId);

        emit AdSpaceReverted(_tokenId, adSpace.seller);
    }

    /**
     * @dev Get the remaining time until the next monthly payment is due.
     * @param _tokenId The ID of the ad space token.
     */
    function getRemainingPaymentTime(uint256 _tokenId) external view returns (uint256) {
        AdSpace storage adSpace = adSpaces[_tokenId];
        if (block.timestamp >= adSpace.lastPaidTime + MONTHLY_DURATION) {
            return 0; // Payment due
        } else {
            return (adSpace.lastPaidTime + MONTHLY_DURATION) - block.timestamp;
        }
    }
}