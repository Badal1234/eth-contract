pragma solidity ^0.7.4;
// SPDX-License-Identifier: GPL-3.0
contract DappToken {
    uint256 public totalSupply;
    string public name = 'Dapp Token';
    string public symbol = 'DAP';

    event Transfer(
        address _from,
        address _to,
        uint256 _amount
    );
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
 
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    constructor(uint256 _totalSupply)  {
        balanceOf[msg.sender] = _totalSupply;
        totalSupply = _totalSupply; 
    }

    function transfer(address _to, uint256 _amount) public returns(bool success){
        require(_amount <= totalSupply,'amount must be greater than balance');
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount); 
        return success;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        require(_spender != msg.sender);
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success){
        require(_amount <= balanceOf[_from],'amount must be greater than balance');
        require(_amount <= allowance[msg.sender][_from], 'withdraw amount is not sufficient');
        balanceOf[_from] -= _amount;
        balanceOf[_to] += _amount;
        allowance[msg.sender][_from] -= _amount;
        emit Transfer(_from, _to, _amount);
        return true;

    }
}