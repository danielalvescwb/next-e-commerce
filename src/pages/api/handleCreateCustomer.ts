import { v4 as uuidv4 } from "uuid";
export default function handler(req, res) {
  const { fullName, email, street, number } = req.body.values;
  res.status(200).json({
    error: false,
    message: "",
    newCustomer: {
      id: uuidv4(),
      fullName,
      savedEmail: email,
      street,
      number,
    },
  });
}
