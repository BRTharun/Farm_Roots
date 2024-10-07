import referralHand from "../../../assets/images/Refer/referral-hand.svg";
import shareLogo from "../../../assets/images/Refer/share-circle.svg";
import bag from "../../../assets/images/Refer/shopping-bag-circle.svg";
import rupees from "../../../assets/images/Refer/rupee-circle.svg";
import whatsapp from "../../../assets/images/Refer/whatsapp.svg";
import share from "../../../assets/images/Refer/share.svg";
import '../../../assets/styles/Refer.css'; 

export default function Refer() {
  const referralCode = "FARMROOTS_XYZ123ABC";
  const referralLink = `http://localhost:3000/?referral=${referralCode}`;

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FarmRoots - Refer and Earn',
        text: `Hey! Check out FarmRoots - a grocery delivery app. Use my code ${referralCode} to sign up and get 15% off on your first order!`,
        url: referralLink,
      })
      .then(() => console.log('Referral link shared successfully!'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in this browser.');
    }
  };

  return (
    <div className="refer-container">
      <div className="name-image-container">
        <h4 className="get-amount">
          25% off for you, 15% off for them!
        </h4>
        <img
          src={referralHand}
          alt="Referral Hand"
          className="referral-hand-image"
        />
      </div>
      <div className="how-it-works-container">
        <h4>How it Works</h4>
        <ul className="list-of-instructions">
          <div className="line"></div>
          <li className="instruction">
            <img src={shareLogo} alt="Share Logo" />
            <p className="instruction-para">
              Share the referral link{" "}
              <span className="highlight-span">
                with your friend
              </span>
            </p>
          </li>
          <li className="instruction">
            <img src={bag} alt="Shopping Bag" />
            <p className="instruction-para">
              After your friend places their first order, you
              <span className="highlight-span"> get 25% off</span> up
              to ₹200 on your next order
            </p>
          </li>
          <li className="instruction">
            <img src={rupees} alt="Rupees" />
            <p className="instruction-para">
              Upon 10 successful referrals,{" "}
              <span className="highlight-span">you earn ₹2000</span>
            </p>
          </li>
        </ul>
        <a
          href={`https://api.whatsapp.com/send?text=Hey!%20Check%20out%20FarmRoots%20-%20a%20grocery%20delivery%20app%20that%20delivers%20over%207000%20products%20in%2010%20minutes!%20Use%20my%20code%20${referralCode}%20to%20sign%20up%20and%20get%2015%25%20off%20on%20your%20first%20order.%0ADownload%20now:%20http://localhost:3000/`}
          className="whatsapp-link"
        >
          <img src={whatsapp} alt="Whatsapp logo" />
          <span className="invite-via-whatsapp">Invite via Whatsapp</span>
        </a>
        <button className="share-btn" onClick={handleShareClick}>
          <img src={share} alt="Share Logo" />
          <span className="share-invite-link">Share Invite Link</span>
        </button>
      </div>
      <hr />
    </div>
  );
}
