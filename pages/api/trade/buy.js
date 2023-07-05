export default async function handler(req, res) {
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
    if (response.status == 400) {
      return res.status(400).json(result);
    }
    res.status(200).json({
      msg: "success",
      transiction: { ...result["transiction"], createdAt: new Date() },
    });
  } catch (err) {
    res.status(404).json({ err: "something went wrong try again" });
  }
}
