import customer from '../../data/initialCustomer.json'
export default function handler(req, res) {
  res.status(200).json(customer)
}
