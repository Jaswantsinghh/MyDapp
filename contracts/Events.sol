//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
contract Events{
    address owner;
    address user;

    struct EventData{
        string name;
        string message;
        string timeStamp;
        address userAddress;
    }

    constructor(){
      owner = msg.sender;
      console.log("Deploying Events Smart Contact");
    }

        EventData [] public events;

        function createEvent(string memory _name, string memory _message, string memory _timeStamp) public {
            events.push(EventData({name: _name, message: _message, timeStamp: _timeStamp, userAddress: user}));
        }

        function fetchAll() public view returns (EventData[] memory){
            return events;
        }

        function getOwner() external view returns (address) {
        return owner;
    }
    }