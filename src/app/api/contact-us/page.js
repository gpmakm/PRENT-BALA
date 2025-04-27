import React from 'react'

const page = () => {
  return (
    <div id='contCanvas'>
        <p id="welcome"> Welcome to all of you on this platform. Here you will get every kind of cards like Wedding cards, Billbooks, Mundan ceremony cards, and more. </p>
        <ul className="card-types">
          <li className='card-items'>Visiting cards</li>

          <li className='card-items'>Letter pads</li>
          <li className='card-items'>Greeting cards</li>
          <li className='card-items'>Posters and Pamplates</li>
          <li className='card-items'>Stickers</li>
          <li className="card-items">
            video cards</li>
          <li className='card-items'>Identity cards</li>
          <li className='card-items'>Stamps</li>
          <li className='card-items'>Handbills</li>
          <li className='card-items'>Glowshine boards</li>
          <li className='card-items'>Carry Bags</li>
          <li className='card-items'>Calenders</li>
          <li className='card-items'>Receipts</li>

        </ul>
        <div className="contact">
        <p>Contact us at: Near State Bank, Gupta complex, Kalika path, Hasanpur bazaar</p>
        <p>
          Call us on: +91 7371819171, +91 9576256696
        </p>
        <div className='customOrder'>
          <p>
            If you want to give any custom order just click the give button to chat with me
          </p>
        <a href="https://wa.me/917371819171?text=Hello!%20I%20want%20to%20discuss%20something%20with%20you." target="_blank" id='whatsapp' style={{color:'green'}}>WhatsApp PRENTBALA</a>
    


        </div>
      </div>
    </div>
  )
}

export default page