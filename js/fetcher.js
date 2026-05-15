async function loadComponents() {
    const navResponse = await fetch('topnav.html');
    const navData = await navResponse.text();
    document.getElementById('topnav').innerHTML = navData;
    
    //både topnav OCH footer måste vara med i sidan annars crashar app.js, inget dåligt
    //händer, men cart funkar då inte längre, kan se men inte göra något
    const footerResponse = await fetch('footer.html');
    const footerData = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerData;
}