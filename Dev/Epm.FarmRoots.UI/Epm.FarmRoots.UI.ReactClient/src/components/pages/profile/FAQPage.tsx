import { useState } from "react"; 
import { MdKeyboardArrowRight } from "react-icons/md";
import { mockFAQs } from "./mockFAQs"; 
import '../../../assets/styles/FAQPage.css'; 

interface FAQ {
  id: number;
  name: string;
  answer: string;
}

export default function FAQS() {
  const [faqs] = useState<FAQ[]>(mockFAQs.map(faq => ({
    ...faq,
    id: Number(faq.id),  
  })));
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleFAQClick = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:support@farmroots.com';
  };

  return (
    <div className="faqs-container">
      <h4>FAQS</h4>
      <ul className="list-of-faqs">
        {faqs.map((faq) => (
          <li key={faq.id}>
            <div className="faq" onClick={() => handleFAQClick(faq.id)}>
              <span className="faq-descr">{faq.name}</span>
              <MdKeyboardArrowRight className={`right-arrow-icon ${expandedFAQ === faq.id ? 'rotated' : ''}`} />
            </div>
            {expandedFAQ === faq.id && <p className="faq-answer">{faq.answer}</p>}
          </li>
        ))}
      </ul>
      <button className="contact-button" onClick={handleContactClick}>
        Contact Us
      </button>
    </div>
  );
}
