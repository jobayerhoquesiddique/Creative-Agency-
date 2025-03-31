import Hero from "./components/Hero"
import WearYourStory from "./components/WearYourStory"
import Services from "./components/Services"
import PortfolioGrid from "./components/PortfolioGrid"
import BlockchainVisualization from "./components/BlockchainVisualization"
import NFTShowcase from "./components/NFTShowcase"
import BlockchainTestimonials from "./components/BlockchainTestimonials"
import CryptoNews from "./components/CryptoNews"
import BlockchainFAQ from "./components/BlockchainFAQ"
import ContactForm from "./components/ContactForm"
import NewsletterSubscribe from "./components/NewsletterSubscribe"
import CryptoPriceTracker from "./components/CryptoPriceTracker"

export default function Home() {
  return (
    <>
      <Hero />
      <WearYourStory />
      <Services />
      <div className="container mx-auto px-4 py-12">
        <BlockchainVisualization />
      </div>
      <PortfolioGrid />
      <NFTShowcase />
      <BlockchainTestimonials />
      <CryptoNews />
      <BlockchainFAQ />
      <div id="contact">
        <ContactForm />
        <NewsletterSubscribe />
      </div>
      <CryptoPriceTracker />
    </>
  )
}

