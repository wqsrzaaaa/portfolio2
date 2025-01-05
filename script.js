const menuIcon = document.getElementById('menu-icon');
const menuPage = document.getElementById('menu-page');
const closeMenu = document.getElementById('close-menu');

menuIcon.addEventListener('click', () => {
    menuPage.style.left = '0%';
    menuPage.style.transition = '.4s';
});

closeMenu.addEventListener('click', () => {
    menuPage.style.left = '-100%'; 
    menuPage.style.transition = '.4s'; 
});

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    loop:false,
    on: {
        slideChange: function () {
            updateExpandedContent();
        }
    }
});
function updateExpandedContent() {
    var activeSlide = swiper.slides[swiper.activeIndex];
    var content = activeSlide.getAttribute('data-content');
    var expandedContentDiv = document.getElementById('expanded-content');
    expandedContentDiv.innerText = content;

    expandedContentDiv.classList.add('show');

    
    setTimeout(() => {
        expandedContentDiv.classList.remove('show');
    }, 20000);
}

updateExpandedContent();


contentweb = document.querySelector("#content-web")
color= document.querySelector("#color-headings")
contentdesign = document.querySelector("#content-design")
webclick = document.querySelector(".web-click")
 designclick = document.querySelector(".design-click")

webclick.addEventListener('click',function(){
    contentweb.style.display = 'block'
    contentdesign.style.display = 'none'
    color.style.left = 0
})
designclick.addEventListener('click',function(){
    contentweb.style.display = 'none'
    contentdesign.style.display = 'block'
    color.style.left = "50%"

})
const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messagesContainer');

    // Listen for the Enter key press
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if in a form
            const messageText = messageInput.value.trim(); // Get the input value

            if (messageText) {
                // Create a new message element
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                messageElement.textContent = messageText; // Set the message text

                // Append the new message to the messages container
                messagesContainer.appendChild(messageElement);

                // Clear the input field
                messageInput.value = '';

                // Scroll to the bottom of the messages container
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    });

AOS.init();