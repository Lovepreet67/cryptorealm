import cookie from "cookie";
export default async function handler(req, res) {
  try {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      })
    );
  } catch (err) {
    res.status(404).json({ err: "something went wrong try again" });
  }
}
