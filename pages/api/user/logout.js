import cookie from "cookie";
export default async function handler(req, res) {
  console.log("inside logout api");
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      })
    );
    return res.status(200).json("everything is ok");
  } catch (err) {
    return res.status(404).json({ err: "something went wrong try again" });
  }
}
