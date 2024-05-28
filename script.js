document.getElementById('loveForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name1 = document.getElementById('name1').value.trim();
    let name2 = document.getElementById('name2').value.trim();
    
    if (name1 && name2) {
        let percentage = Math.floor(Math.random() * 101);
        document.getElementById('result').innerText = `${name1} and ${name2} have a love percentage of ${percentage}%!`;

        // Send the names to the server
        fetch('/store-names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name1, name2, percentage })
        }).then(response => response.json())
          .then(data => console.log('Success:', data))
          .catch((error) => console.error('Error:', error));
    } else {
        document.getElementById('result').innerText = 'Please enter both names!';
    }
});
