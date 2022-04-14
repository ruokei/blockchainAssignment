// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./User.sol";
import "./Token.sol";
//import "node_modules/openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AddMusic is Ownable {
    
    LunCoin token;
    User musicUser;
    uint public musicId=1;
    
    constructor(address userContract, LunCoin _token) public {
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
    
    function addProduct(string memory musicName, uint productPrice) public {
        if (musicUser.getCustomerDetail(msg.sender).isExist) {
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