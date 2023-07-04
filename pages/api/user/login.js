import cookie from "cookie";
export default async function handler(req, res) {
  console.log("inside a login route under api folder");
  try {
    const response = await fetch(process.env.MAIN_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      redirect: "follow",
    });
    const result = await response.json();
    console.log(result);
    if (response.status == 401) {
      res.status(401).json({ invalidUserName: true });
    } else if (response.status == 200) {
      console.log(result);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", result["jwt"], {
          httpOnly: true,
          // secure:for https domain,
          path: "/",
          maxAge: 36000,
        })
      );
      res.status(200).json({ msg: "success" });
    } else {
      res.status(404).json({ err: "Bad gateway" });
    }
  } catch (err) {
    res.status(404).json({ err: "something went wrong try again" });
  }
}
