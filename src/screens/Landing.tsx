import { MainText, Navbar } from "../utility";
import { Hero, PrimaryCard, ReviewCard } from "../components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const cookie = window.document.cookie;
  const index = cookie.indexOf(name);
  if (index == -1) return undefined;
  return cookie.slice(index + name.length + 1);
}
function Landing() {
  const [state, setState] = useState("image");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const val = getCookie("loggedIn");
      if (val != null) navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  return (
    <div className={"flex flex-col mx-5 md:mx-16"}>
      <Navbar setState={setState} />
      <Hero state={state} setState={setState} />
      {/*why choose this section*/}
      <div id={"Features"} className={"md:-my-11 flex-col"}>
        <MainText text={"Why choose CryptoRealm ?"} />
        <div
          className={"grid md:grid-cols-2 md:gap-x-10 gap-y-5 md:gap-y-10  "}
        >
          <PrimaryCard
            title={"To save money for investment"}
            description={
              "why waste your precious money when you can just learn using coinRealm"
            }
            imgSrc={"/images/saving.svg"}
            imgAlt={"Save money"}
          />
          <PrimaryCard
            title="Visulization"
            description="Become able to see ups and downs visualaly and skip the long reading"
            imgSrc={"/images/refactor.svg"}
            imgAlt={"Visulization"}
          />
          <PrimaryCard
            title="No commitments"
            description="No commitments for selling or keeping crypto . no bounds keep as much as you can"
            imgSrc={"/images/commitment-icon.svg"}
            imgAlt={"Commitements"}
          />
          <PrimaryCard
            title="Feel the real"
            description="Feels like real price may increase or decrease in real time."
            imgSrc={"/images/real_time_analytics.svg"}
            imgAlt={"Feel the real"}
          />
        </div>
      </div>
      <div id={"About"} className={"mt-10"}>
        <MainText text={"How it works ?"} />

        <div className={"grid md:grid-cols-2 gap-x-10 gap-y-5 md:gap-y-10 "}>
          <PrimaryCard
            title="Sign In"
            description="sign in using google account or phone number choose username and you are ready to enter in CRYPTOREALM"
            imgSrc={"/images/dashboard.svg"}
            imgAlt={"Save money"}
            num={1}
          />
          <PrimaryCard
            title="Get started"
            description="login using credential and use given virtual money to buy or sell coins ."
            imgSrc={"/images/crypt0.svg"}
            imgAlt={"Save money"}
            num={2}
          />
          <PrimaryCard
            title="Learn"
            description="Gain money from profit and lesson from losses . dont worry there no loss of your money!"
            imgSrc={"/images/dashboard.svg"}
            imgAlt={"Save money"}
            num={3}
          />
          <PrimaryCard
            title="Make friends"
            description="Make friend and join them in CRYPTOREALM by transfer money from them as loan. join the community."
            imgSrc={"/images/team.svg"}
            imgAlt={"Save money"}
            num={4}
          />
        </div>
      </div>
      <div
        className={
          "flex flex-col gap-5 md:gap-10 justify-center md:[&>*:nth-child(odd)]:self-start md:[&>*:nth-child(even)]:self-end mt-20 mb-10 md:[&>*:nth-child(even)]:flex-row-reverse "
        }
      >
        <ReviewCard
          comment={
            "Best way to enter crypto trading . help in understanding real trading. dashbord help to remeber past mistakes . for me its the best trading app so far for learning purpose ."
          }
          imgSrc={"./images/unsplash2.jpg"}
          imgAlt={"ALt"}
        />
        <ReviewCard
          comment={
            "best way to enter crypto trading . help in understanding real trading. dashbord help to remeber past mistakes . for me its the best trading app so far for learning purpose"
          }
          imgSrc={"./images/unsplash2.jpg"}
          imgAlt={"Alt"}
        />
      </div>
    </div>
  );
}

export default Landing;
