let navbar = document.querySelector('.header .flex .navbar');
let menubtn = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

menubtn.onclick = () => {
    navbar.classList.toggle('active');
    menubtn.classList.toggle('fa-times'); 
}

window.onscroll = () => {
    navbar.classList.remove('active');
    menubtn.classList.remove('fa-times');

    if(window.scrollY > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}

function toggleAnswer(element) {
    let answer = element.querySelector('.faq-answer');
    let sign = element.querySelector('.faq-question span');
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
        sign.textContent = '+';
    } else {
        answer.style.display = 'block';
        sign.textContent = '-';
    }
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const country = document.getElementById('country').value;
    const message = document.getElementById('message').value;

    // Discord Webhook URL (Replace with your actual webhook)
    const webhookURL = "https://discord.com/api/webhooks/1342860220379959397/lLFhLSuMkA_JZARzvPp6XXnXV84hz0QfP2GY_CLC_LOeFWiOW4wfNaPCl5oSD8GsRdog";
    
    const payload = {
        content: "**New Contact Form Submission**",
        embeds: [
            {
                title: "Contact Form Details",
                color: 16711680, // Red color
                fields: [
                    { name: "Name", value: name, inline: true },
                    { name: "Email", value: email, inline: true },
                    { name: "Phone", value: phone, inline: true },
                    { name: "Country", value: country, inline: true },
                    { name: "Message", value: message, inline: false }
                ],
                footer: {
                    text: "Submitted via Contact Form"
                },
                timestamp: new Date().toISOString()
            }
        ]
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            alert("Message Sent Successfully!");
            document.getElementById('contactForm').reset();
        } else {
            alert("Failed to send message!");
        }
    }).catch(error => {
        console.error("Error sending message:", error);
        alert("Error sending message!");
    });
});