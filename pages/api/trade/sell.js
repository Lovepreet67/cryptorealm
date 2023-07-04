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
    const response = await fetch(process.env.MAIN_URL + "/sell", {
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
      res.status(400).json(result);
      return;
    }
    res.status(200).json({
      msg: "success",
      transiction: { ...result["transiction"], createdAt: new Date() },
    });
  } catch (err) {
    // console.log(err);
    res.status(404).json({ err: "something went wrong try again" });
  }
}
