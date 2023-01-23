// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';


contract TWLOG2 is ERC20 {
    address public admin;
    mapping (address => uint) balances;
    uint public totalCoin;
    uint public totalMinted;
    address dispatcher = 0xd0956f8Ac0DABFCE0B52273Bd15d8BD7f9f4e49F;

    constructor() ERC20('Wrapped TLog2', 'TWLOG2') {
        admin = msg.sender;
        _mint(dispatcher, 100000 * 10 ** 8);
        totalCoin = 1000000 * 10 ** 8;
        totalMinted = 100000 * 10 ** 8;
    }

    function decimals() public pure override returns (uint8) {
        return 8;
    }

    function mint(address to, uint amount) external {
        uint net = totalMinted + amount;
        require(msg.sender == admin, "only admin can access");
        require(net <= totalCoin, "Limit is only 1 million.");
        _mint(to, amount);
        totalMinted += amount;
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
        totalMinted -= amount;
    }

} 