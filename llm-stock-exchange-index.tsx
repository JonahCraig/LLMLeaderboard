import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, DollarSign, Trophy, Search, Zap, Clock } from "lucide-react"
import Link from "next/link"

const llms = [
  { name: "GPT-3", price: 0.06, link: "https://example.com/gpt-3", intelligence: 95, latency: 150 },
  { name: "BERT", price: 0.04, link: "https://example.com/bert", intelligence: 85, latency: 100 },
  { name: "T5", price: 0.05, link: "https://example.com/t5", intelligence: 90, latency: 120 },
  { name: "GPT-2", price: 0.03, link: "https://example.com/gpt-2", intelligence: 80, latency: 80 },
  { name: "XLNet", price: 0.07, link: "https://example.com/xlnet", intelligence: 92, latency: 160 },
  { name: "RoBERTa", price: 0.045, link: "https://example.com/roberta", intelligence: 88, latency: 110 },
  { name: "ALBERT", price: 0.035, link: "https://example.com/albert", intelligence: 82, latency: 90 },
  { name: "DistilBERT", price: 0.025, link: "https://example.com/distilbert", intelligence: 75, latency: 70 },
  { name: "Electra", price: 0.055, link: "https://example.com/electra", intelligence: 87, latency: 130 },
  { name: "GPT-Neo", price: 0.065, link: "https://example.com/gpt-neo", intelligence: 93, latency: 170 },
]

export default function LLMStockExchange() {
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortBy, setSortBy] = useState("price")
  const [searchTerm, setSearchTerm] = useState("")

  const sortedLLMs = useMemo(() => {
    return [...llms]
      .filter(llm => llm.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price
        } else if (sortBy === "intelligence") {
          return sortOrder === "asc" ? a.intelligence - b.intelligence : b.intelligence - a.intelligence
        } else if (sortBy === "latency") {
          return sortOrder === "asc" ? a.latency - b.latency : b.latency - a.latency
        }
        return 0
      })
  }, [sortOrder, sortBy, searchTerm])

  const cheapestLLM = sortedLLMs[0]

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-8 w-8 text-yellow-400" />
          <span className="text-2xl font-bold">LLM Stock Exchange</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="#home" className="hover:text-yellow-400 transition-colors">Home</Link></li>
            <li><Link href="#llm-listing" className="hover:text-yellow-400 transition-colors">LLM Listing</Link></li>
            <li><Link href="#cheapest-llm" className="hover:text-yellow-400 transition-colors">Cheapest LLM</Link></li>
            <li><Link href="#leaderboard" className="hover:text-yellow-400 transition-colors">Leaderboard</Link></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <section id="home" className="py-20 px-4 text-center bg-gray-800">
          <h1 className="text-5xl font-bold mb-6 text-yellow-400">Welcome to the LLM Stock Exchange</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Compare prices, intelligence scores, and latency of various Large Language Models and find the best fit for your needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
              Get Started
            </Button>
            <Button className="bg-gray-700 hover:bg-gray-600 text-gray-100 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
              Learn More
            </Button>
          </div>
        </section>

        <section id="llm-listing" className="py-16 px-4 bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">LLM Listing</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => {
                    setSortBy("price")
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }} 
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-100"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort by Price
                </Button>
                <Button 
                  onClick={() => {
                    setSortBy("intelligence")
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }} 
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-100"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Sort by Intelligence
                </Button>
                <Button 
                  onClick={() => {
                    setSortBy("latency")
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }} 
                  className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-100"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Sort by Latency
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  type="text" 
                  placeholder="Search LLMs" 
                  className="bg-gray-700 text-gray-100" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedLLMs.map((llm, index) => (
                <li key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">{llm.name}</h3>
                  <p className="text-lg mb-2 text-gray-300">${llm.price.toFixed(2)} per token</p>
                  <div className="flex items-center mb-2">
                    <Zap className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-gray-300">Intelligence: {llm.intelligence}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Clock className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-gray-300">Latency: {llm.latency}ms</span>
                  </div>
                  <Link href={llm.link} className="text-yellow-400 hover:underline">View Details</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="cheapest-llm" className="py-16 px-4 bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Cheapest LLM</h2>
            <p className="text-xl mb-4 text-gray-300">
              The cheapest LLM is currently <strong>{cheapestLLM.name}</strong> at ${cheapestLLM.price.toFixed(2)} per token.
            </p>
            <p className="text-lg mb-8 text-gray-400">
              Intelligence: {cheapestLLM.intelligence} | Latency: {cheapestLLM.latency}ms
            </p>
            <Link href={cheapestLLM.link} className="bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105">
              Get the Best Deal
            </Link>
          </div>
        </section>

        <section id="leaderboard" className="py-16 px-4 bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">LLM Leaderboard</h2>
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-800 font-semibold text-yellow-400">Name</th>
                    <th className="py-2 px-4 bg-gray-800 font-semibold text-yellow-400">Price</th>
                    <th className="py-2 px-4 bg-gray-800 font-semibold text-yellow-400">Intelligence</th>
                    <th className="py-2 px-4 bg-gray-800 font-semibold text-yellow-400">Latency</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLLMs.map((llm, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                      <td className="py-2 px-4">{llm.name}</td>
                      <td className="py-2 px-4">${llm.price.toFixed(2)}</td>
                      <td className="py-2 px-4">{llm.intelligence}</td>
                      <td className="py-2 px-4">{llm.latency}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-yellow-400">LLM Stock Exchange</span>
            <p className="mt-2">Your go-to platform for comparing LLM prices and performance.</p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  )
}