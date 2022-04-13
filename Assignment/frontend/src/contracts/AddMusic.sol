// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./User.sol";
import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// step to buy a product in remix IDE
// 1 approve
// 2 allowance

// 1. call approve function in token.sol
// 0x05898eB9924012c537B69b87DA3E91823ec4c899 DmusicProduct address
// put amount 20

// 2. call allowance in token.sol
// owner: 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB customer address
// spender: 0x05898eB9924012c537B69b87DA3E91823ec4c899

contract AddMusic is Ownable {
    
    Token token;
    User musicUser;
    uint public musicId=1;
    
    constructor(address userContract, Token _token) public {
        musicUser = User(userContract);
        token = _token;
    }
        
    struct Product {
        uint musicId;
        string musicName;
        uint productPrice;
        address artistAddress;
    }
    
    mapping(uint => Product) public products;
    mapping(address => uint[]) public customerProductPurchased; 
    mapping(address => uint[]) public artistProduct; 
    
    function addProduct(string memory productName, uint productPrice) public {
        if (dmusicUser.getCustomerDetail(msg.sender).isExist) {
            revert("Only an Artist can upload product!");
        }
        
        products[musicId] = Product(musicId, musicName, productPrice, msg.sender);
        artistProduct[msg.sender].push(musicId);
        musicId++;
    }
    
    function buyProduct(uint id) public {
        address artistAddress = musicUser.getArtistDetail(products[id].artistAddress).artistAddress;
        token.transferFrom(msg.sender, artistAddress, products[id].productPrice * 95 / 100);
        token.transferFrom(msg.sender, Ownable.owner(), products[id].productPrice * 5 / 100);
        customerProductPurchased[msg.sender].push(products[id].musicId);
    }
    
    function getOwner() public view returns (address) {
        return Ownable.owner();
    }
}