fetch('/api/feed')
  .then(res => res.json())
  .then(data => {
    console.log(data.text);
    console.log('Source:', data.source);
    console.log('Category:', data.category);
  });
