import React from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';


const TermsofService = () => {
    return (
      <div className='terms-cont'>
        <Header/>
        <h1 className='terms-header'>Terms of Service</h1>
        
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms. 
          If you do not agree to these Terms, please refrain from using the Website.
        </p>
        
        <h2>2. Use of the Website</h2>
        <h3>2.1 Eligibility</h3>
        <p>
          You must be at least 18 years old to use the Website. By using the Website, you represent and warrant that you are 18 years of age or older.
        </p>
        
        <h3>2.2 Account Registration</h3>
        <p>
          In order to access certain features of the Website, you may need to create an account. When creating an account, you agree to provide accurate and complete information. 
          You are responsible for maintaining the confidentiality of your account credentials and are fully responsible for all activities that occur under your account. 
          Notify us immediately if you suspect any unauthorized access to your account.
        </p>
        
        <h3>2.3 Prohibited Conduct</h3>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul>
          <li>Violating any applicable laws or regulations</li>
          <li>Interfering with the security or integrity of the Website</li>
          <li>Engaging in any unauthorized use of the Website, including collecting or storing personal information of other users</li>
          <li>Uploading, posting, or transmitting any content that is unlawful, harmful, obscene, or infringing upon the rights of others</li>
          <li>Engaging in any activity that could disrupt, negatively affect, or impair the Website's functionality or performance</li>
          <li>Attempting to gain unauthorized access to any portion or feature of the Website</li>
        </ul>
        
        <h2>3. Intellectual Property Rights</h2>
        <p>
          The Website and its original content, features, and functionality are owned by LostAndFound and protected by intellectual property laws. 
          You agree not to modify, reproduce, distribute, create derivative works, publicly display, or perform any copyrighted or proprietary materials unless authorized in writing by LostAndFound.
        </p>
        
        <h2>4. Privacy Policy</h2>
        <p>
          Our Privacy Policy governs the collection, use, and disclosure of personal information you provide to us. 
          By using the Website, you consent to the collection and use of your information as described in our Privacy Policy.
        </p>
        
        <h2>5. Disclaimer of Warranties</h2>
        <p>
          The Website is provided on an "as is" and "as available" basis, without any warranties of any kind, whether express or implied. 
          LostAndFound does not guarantee the accuracy, reliability, or completeness of any content on the Website. 
          You acknowledge and agree that your use of the Website is at your own risk.
        </p>
        
        <h2>6. Limitation of Liability</h2>
        <p>In no event shall LostAndFound, its affiliates, or its respective directors, officers, employees, or agents be liable for any indirect, consequential, incidental, special, punitive, or exemplary damages, arising out of or in connection with your use of the Website, even if advised of the possibility of such damages

        </p>
        <h2>Idemnification</h2>
        <p>You agree to indemnify and hold LostAndFound harmless from any claims, demands, liabilities, damages, losses, or expenses, including attorney's fees, arising out of or in connection with your use of the Website or violation of these Terms</p>
          <h3>Modifications to the Terms</h3>
          <p>LostAndFound reserves the right to modify these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the Website. Your continued use of the Website after the posting of the revised Terms</p>
          <Footer/>
          <style jsx="true">{`
                .terms-header {
                    margin-top: 60px;
                }
                .terms-cont {
                  margin-left: 10px;
                }
            `}</style>
          </div>
          
    )}

    export default TermsofService;