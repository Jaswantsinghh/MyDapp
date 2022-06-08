const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Events", async function () {
  
  let EventData;
  let event;
  
  beforeEach(async function () {
    // Here we call our contract 'TodoContract' to be precise, it's the same as the name of the contract we just wrote 
    EventData = await ethers.getContractFactory("Events");
    // Here the contract is deployed in a test environment
    event = await EventData.deploy();
    await event.deployed();
  });

  it("Should Create an event", async function () {
    const createEventTx = await event.createEvent("Tester", "A demo message", "6/8/2022 6:19:04 AM");
    await createEventTx.wait();
  });


  it("Should Fetch a List of events", async function () {
    const createEventTx = await event.createEvent("Tester", "Brush your teeth", "6/8/2022 6:19:04 AM");
    const createEventTx1 = await event.createEvent("Afternoon", "Eat", "6/8/2022 6:19:04 AM");
    await createEventTx.wait();
    await createEventTx1.wait();


    expect(await event.fetchAll())
      .to.have.lengthOf(2);
  });
});
