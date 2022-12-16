// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol';

contract WLog is ERC20 {
    address public admin;
    uint public _total_supply;

    constructor() ERC20('New Log', 'WLOG') {
        admin = msg.sender;
        _total_supply = 0;
    }

    function decimals() public pure override returns (uint8) {
        return 8;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin, "only admin can access");
        _mint(to, amount);
        _total_supply += amount;
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
        _total_supply -= amount;
    }
}