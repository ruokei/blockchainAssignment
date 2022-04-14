// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Buying a product in remix IDE
// 1 approve
// 2 allowance

// 1. call approve function in Token.sol with Customer Address
// Customer address
// enter amount 200

// 2. call allowance in Token.sol with Customer Address
// owner: Customer address
// spender: Customer address

contract Music is Ownable, ERC20{

    uint public musicId=1;
    bool public isExist=false;
    // Struct

    enum UserType {
        Customer,
        Artist
    }
    
    struct Product {
        uint musicId;
        string musicName;
        uint productPrice;
        address artistAddress;
        bool purchased;
    }
    
    struct Customer {
        string customerName;
        bool isExist;
    }
    
    struct Artist {
        address artistAddress;
        string artistName;
        bool isExist;
    }

    // Mapping 
    mapping(address => Customer) public customerList;
    mapping(address => Artist) public artistList;
    mapping(uint => Product) public products;
    mapping(address => uint[]) public artistProduct; 
    mapping(address => uint[]) public customerProductPurchased; 
    

    // Constructor
    constructor() ERC20("LunCoin", "Lun") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }

    function addProduct(string memory musicName, uint productPrice) public {
        require(bytes(musicName).length > 0);
        require(productPrice > 0);

        products[musicId] = Product(musicId, musicName, productPrice, msg.sender, false);
        artistProduct[msg.sender].push(musicId);
        musicId++;
    }
    
    function buyProduct(uint id) public {
        address artistAddress = getArtistDetail(products[id].artistAddress).artistAddress;
        transferFrom(msg.sender, artistAddress, products[id].productPrice * 95 / 100);
        transferFrom(msg.sender, Ownable.owner(), products[id].productPrice * 5 / 100);
        customerProductPurchased[msg.sender].push(products[id].musicId);
    }

    function registerCustomer(string memory name) public {
        isExist = true;
        customerList[msg.sender] = Customer({
            customerName: name,
            isExist: isExist
        });
    }
    
    function registerArtist(string memory name) public {
        isExist = true;
        artistList[msg.sender] = Artist({
            artistAddress: msg.sender,
            artistName: name,
            isExist: isExist
        });
    }
    
    function getArtistDetail(address artistAddress) public view returns (Artist memory) {
        return artistList[artistAddress];
    }
    
    function getCustomerDetail(address customerAddress) public view returns (Customer memory) {
        return customerList[customerAddress];
    }
    
    function getOwner() public view returns (address) {
        // account that deployed the contract
        return Ownable.owner();
    }

    function buyTokens() public payable returns (bool) {
        // Calculate the number of tokens to buy
        uint tokenAmount = 1;
        
        require(tokenAmount > 0, "You need to send some Ether");
    
        // Transfer tokens to the user
        transferFrom(getOwner(), msg.sender, tokenAmount);
        return true;
    }
}