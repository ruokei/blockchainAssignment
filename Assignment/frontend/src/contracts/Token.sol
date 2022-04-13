// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LunCoin is ERC20{
    constructor() ERC20("LunCoin", "Lun") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}