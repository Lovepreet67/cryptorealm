import React, { useState } from "react";
import Hero from "./hero/Hero";
import Card from "../utilities/Card";
import ReviewCard from "../utilities/ReviewCard";
export default function LandMain({ left, setLeft }) {
  return (
    <div>
      <Hero left={left} setLeft={setLeft} />
      <h1 className="text-3xl font-bold ml-[7%] mb-10 mt-16">
        Why choose this?
      </h1>
      <div className="grid md:grid-cols-2 grid-cols-1  md:gap-y-16 gap-y-9">
        <Card
          title="To save money for investment"
          description="why waste your precious money when you can just learn using coinRealm"
          imagePath="./images/undraw_savings_re_eq4w.svg"
          imagePosition="right"
        />
        <Card
          title="No commitments"
          description="No commitments for selling or keeping crypto . no bounds keep as much as you can"
          imagePath="./images/contract.svg"
          imagePosition="right"
        />
        <Card
          title="Feel the real"
          description="Feels like real price may increase or decrease in real time."
          imagePath="./images/real_time_analytics.svg"
          imagePosition="right"
        />
        <Card
          title="Visulization"
          description="become able to see ups and downs visualaly and skip the long reading"
          imagePath="./images/undraw_setup_analytics_re_foim.svg"
          imagePosition="right"
        />
      </div>
      {/* next section */}
      <h1 className="text-3xl font-bold ml-[7%] mb-10 mt-16">How it works?</h1>
      <div className="grid md:grid-cols-2 grid-cols-1  md:gap-y-16 gap-y-9">
        <Card
          num={"1"}
          title="Sign In"
          description="sign in using google account or phone number choose username and you are ready to enter in CRYPTOREALM"
          imagePath="./images/undraw_settings_tab_mgiw.svg"
          imagePosition="right"
        />
        <Card
          num={"2"}
          title="Get started"
          description="login using credential and use given virtual money to buy or sell coins ."
          imagePath="./images/crypt0.svg"
          imagePosition="left"
        />
        <Card
          num={"3"}
          title="Learn"
          description="Gain money from profit and lesson from losses . dont worry there no loss of your money!"
          imagePath="./images/undraw_settings_tab_mgiw.svg"
          imagePosition="right"
        />
        <Card
          num={"4"}
          title="Make friends"
          description="Make friend and join them in CRYPTOREALM by transfer money from them as loan. join the community."
          imagePath="./images/undraw_team_spirit_re_yl1v.svg"
          imagePosition="left"
        />
      </div>
      <div className="border-b border-o border-dotted m-auto mt-10 " />
      <div className="space-y-4 flex-col mt-16">
        <ReviewCard
          imagePath={"/images/aryastark.jpg"}
          description={
            "Best way to enter crypto trading . help in understanding real trading. dashbord help to remeber past mistakes . for me its the best trading app so far for learning purpose ."
          }
          num={1}
        />
        <ReviewCard
          imagePath={"/images/milli.jpeg"}
          description={
            "best way to enter crypto trading . help in understanding real trading. dashbord help to remeber past mistakes . for me its the best trading app so far for learning purpose"
          }
          num={2}
        />
      </div>
      <div className="border-b border-o border-dotted m-10" />
    </div>
  );
}
