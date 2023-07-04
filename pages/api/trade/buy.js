export default async function handler(req, res) {
  // we have to get jwt and ad it to the req.body
  // console.log(req.cookies.jwt);
  const { coinId, quantity } = JSON.parse(req.body);
  const data = {
    coinId,
    quantity,
    currency: "usd",
    token: req.cookies.jwt,
  };
  try {
    const response = await fetch(process.env.MAIN_URL + "/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });
    const result = await response.json();
    console.log(result);
    if (response.status == 400) {
      return res.status(400).json(result);
    }
    res
      .status(200)
      .json({
        msg: "success",
        transiction: { ...result["transiction"], createdAt: new Date() },
      });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ err: "something went wrong try again" });
  }
}
