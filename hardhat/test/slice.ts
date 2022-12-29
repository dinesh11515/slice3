import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
describe("Slice testing", function () {
  let slice: Contract;
  let signer: SignerWithAddress;
  let account: SignerWithAddress;

  before(async () => {
    const accounts = await ethers.getSigners();
    signer = accounts[0];
    account = accounts[1];

    const Slice = await ethers.getContractFactory("Slice");
    slice = await Slice.deploy();
    await slice.deployed();
  });

  it("invest", async function () {
    const tx = await slice.invest(ethers.utils.parseEther("100"), {
      value: ethers.utils.parseEther("100"),
    });
    await tx.wait();
    const balance = await slice.totalInvested();
    expect(balance).to.equal(ethers.utils.parseEther("100"));
  });

  // it("withdraw", async function () {
  //   const tx = await slice.withdraw(ethers.utils.parseEther("100"));
  //   await tx.wait();
  //   const balance = await slice.totalInvested();
  //   expect(balance).to.equal(0);
  // });

  it("register", async function () {
    const tx = await slice.register(50);
    await tx.wait();
    const user = await slice.users(signer.address);
    expect(user.balance).to.equal(ethers.utils.parseEther("700"));
  });

  it("borrow", async function () {
    const amount = ethers.utils.parseEther("10");
    const instalments = 3;
    const tx = await slice.borrow(amount, instalments);
    await tx.wait();
    const user = await slice.users(signer.address);
    expect(user.borrowedAmount).to.equal(amount);
  });

  it("repay", async function () {
    let user = await slice.users(signer.address);
    const amount = user.instalmentAmount;
    const tx = await slice.repay({ value: amount });
    await tx.wait();
    user = await slice.users(signer.address);
    console.log("user", user);

    const interest = await slice.totalInterest();
    console.log("interest", interest);
  });
});
