document.addEventListener("DOMContentLoaded", function () {
  const themeSwitcher = document.getElementById('theme-switcher');

  // Check the saved theme from localStorage and update the checkbox
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeSwitcher.checked = true;
  }
  console.log(currentTheme)
  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
  themeSwitcher.addEventListener('change', function () {
      document.body.classList.toggle('dark-mode', this.checked);
      // Save the current theme preference to localStorage
      localStorage.setItem('theme', this.checked ? 'dark' : 'light');
  });
  /**
   * Let the Navi bar show which page the user is visitiong
   */
  const navLinks = document.querySelectorAll('.navigation a');
  const currentUrl = window.location.href.split("?")[0];  //get rid of the parameters
  navLinks.forEach(link => {
    // console.log(link.href);
    if (link.href === currentUrl) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Get the search term to ininitialise the questions
  const params = new URLSearchParams(window.location.search);

  // Check if the parameter exists
  let filtered_questions;
  if (params.has('q')) {
    const query = params.get('q');
    filtered_questions = performSearch(query.toLowerCase());
  }
  // Attempt to initialize the questions container if it exists(it means the user is in index.html)
  if (document.getElementById('questions-container')) {
    let currentPage = parseInt(params.get('page') || "1", 10); // get the page parameter
    const questionsPerPage = 5; // Number of questions per page    
    if (typeof filtered_questions !== 'undefined') {
      const question_list = filtered_questions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);
      updateQuestionsContainer(question_list);
      setupPagination(filtered_questions.length, questionsPerPage, currentPage);
    } else {
      const question_list = questions.slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage);
      updateQuestionsContainer(question_list);
      setupPagination(questions.length, questionsPerPage, currentPage);
    }
  }

  // Event listener for closing the results on outside click
  document.addEventListener('click', function (event) {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');

    // Check if the click is outside of searchResults and not on the searchInput
    if (!searchResults.contains(event.target) && event.target !== searchInput) {
      searchResults.style.display = 'none'; // Hide the search results
    }
  });
});

//Data array
const questions = [
  {
    id: 1,
    title: "AN ANCIENT QUESTION",
    content: "Why would a good GOD allow bad things?",
    askedTime: "a week ago",
    updatedTime: "a day ago",
    status: "Answered",
    likes: 23,
    dislikes: 5,
    imgSrc: "images/pastors/Apostel_philippus.png",
    answerText: "Ever since the earth has had people living on it, these great questions have been asked: Where is God when bad things happen? Why won't he protect us from disaster? Why doesn't he punish the bad people? Deep thinkers call these questions the problem of evil. They wonder why there is evil at all if our world is guarded by a God who cares about us. If we have a good God, why do bad things happen? That last question really takes some tough thinking. A Greek philosopher named Epicurus asked it more than two thousand years ago. It seemed to him that if God and evil are both in the world, then God should use his powers to eliminate it. If he doesn't, the philosopher asked, why doesn't he? Does he lack the desire or does he lack the strength? That’s a tough one! Christians believe God is as good as it is possible to be, and as strong as it is possible to be. But if Epicurus were here, ...",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 2,
    title: "DOES SCIENCE MEAN MIRACLES CAN'T HAPPEN?",
    content: "Does science mean miracles can't happen?",
    askedTime: "two weeks ago",
    updatedTime: "3 days ago",
    status: "Answered",
    likes: 10,
    dislikes: 2,
    imgSrc: "images/pastors/Apostel_thomas.png",
    answerText: "These days, people take science for granted. You can watch something on your television set as it is happening on the other side of the world. You can fly through the sky in an airplane. A century or two ago, such things would have seemed greater miracles than five thousand dudes sharing a trout-burger. But we know that television and air flight are just matters of science. But that raises another big-league question. If science can explain so many things, does that mean there are no real miracles? The reason that’s such a big question is if there is only science (natural) and nothing miraculous (supernatural), where does that leave God? You can’t see him through a microscope or a telescope, after all. In the Bible, he used miracles to show he was real. So what’s the deal? Can miracles happen? And if not, does that mean there is no God? Or is there some way both science and miracles can be true?",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 3,
    title: "DO PETS GO TO HEAVEN?",
    content: "Do pets go to heaven?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The Bible does not give any explicit teaching on whether pets/animals have souls, or whether pets/animals will be in heaven. However, we can use general biblical principles to develop some clarity on the subject. The Bible states that both man (Genesis 2:7) and animals (Genesis 1:30; 6:17; 7:15, 22) have the 'breath of life'; that is, both man and animals are living beings. The primary difference between human beings and animals is that humanity is made in the image and likeness of God (Genesis 1:26-27), while animals are not. Being made in the image and likeness of God means that human beings are like God in some ways; they are capable of spirituality; they have a mind, emotion, and will; and part of their being continues after death. If pets/animals do have a soul (or spirit, or immaterial aspect), it must therefore be of a different and lesser quality. This difference possibly means that pet/animal souls do not continue in existence after death. Another factor to consider regarding whether pets will be heaven is that animals are a part of God’s creative process in Genesis. God created the animals and said they were good (Genesis 1:25). Therefore, there is no reason why there could not be pets / animals on the new earth (Revelation 21:1). There will most definitely be animals during the millennial kingdom (Isaiah 11:6; 65:25). It is impossible to say definitively whether some of these animals might be the pets we had here on earth. We do know that God is just and that when we get to heaven we will find ourselves in complete agreement with His decision on this issue, whatever it may be.",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 4,
    title: "WHAT DOES THE BIBLE SAY ABOUT DINOSAURS?",
    content: "What does the Bible say about dinosaurs?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The topic of dinosaurs in the Bible is part of a larger ongoing debate within the Christian community over the age of the earth, the proper interpretation of Genesis, and how to interpret the physical evidence we find all around us. Those who believe in an older age for the earth tend to agree that the Bible does not mention dinosaurs, because, according to the old-earth paradigm, dinosaurs died out millions of years before the first man ever walked the earth, so the men who wrote the Bible could not have seen living dinosaurs. Those who believe in a younger age for the earth tend to agree that the Bible does mention dinosaurs, though it never actually uses the word 'dinosaur'. Instead, it uses the Hebrew word tanniyn, which is translated a few different ways in our English Bibles. Sometimes it's 'sea monster,' and sometimes it's 'serpent.' It is most commonly translated 'dragon' in the KJV. The tanniyn appears to have been some sort of giant reptile. These creatures are mentioned nearly thirty times in the Old Testament (e.g., Psalm 74:13; Isaiah 27:1; Jeremiah 51:34) and were found both on land and in the water. Another Hebrew word, livyathan, transliterated leviathan, is used six times in Scripture (e.g., Job 41:1; Psalm 104:26) and refers to some type of large, fierce sea creature. The description of leviathan in Job 41 gives the impression of a strong yet graceful, unstoppable creature against which weapons are unavailing: 'Nothing on earth is its equal' (Job 41:33).",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 5,
    title: "WHAT DOES THE BIBLE SAY ABOUT SEX BEFORE MARRIAGE?",
    content: "What does the Bible say about sex before marriage?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The Bible clearly condemns sexual sins: adultery (consensual sex between a married person and someone other than his or her spouse) (Proverbs 6:32; cf. 1 Corinthians 6:18 and Hebrews 13:4) and fornication (sexual immorality in general) are specified (Matthew 15:19; Romans 1:29; 1 Corinthians 5:1). Sex before marriage, or premarital sex, is not addressed in that exact term, but it does fall within the scope of sexual immorality. The Bible teaches that sex before marriage is immoral in a couple of different passages. One is 1 Corinthians 7:2, which says, “But since sexual immorality is occurring, each man should have sexual relations with his own wife, and each woman with her own husband.” In this verse, marriage is presented as the “cure” for sexual immorality. Sexual union within marriage, which is commended, is set against immorality, which is to be avoided. Thus, any sex outside of marriage is considered immoral. This would have to include premarital sex.",
    responderName: "Pastor, Apostle Peter"
  },{
    id: 6,
    title: "DOES SCIENCE MEAN MIRACLES CAN'T HAPPEN?",
    content: "Does science mean miracles can't happen?",
    askedTime: "two weeks ago",
    updatedTime: "3 days ago",
    status: "Answered",
    likes: 10,
    dislikes: 2,
    imgSrc: "images/pastors/Apostel_thomas.png",
    answerText: "These days, people take science for granted. You can watch something on your television set as it is happening on the other side of the world. You can fly through the sky in an airplane. A century or two ago, such things would have seemed greater miracles than five thousand dudes sharing a trout-burger. But we know that television and air flight are just matters of science. But that raises another big-league question. If science can explain so many things, does that mean there are no real miracles? The reason that’s such a big question is if there is only science (natural) and nothing miraculous (supernatural), where does that leave God? You can’t see him through a microscope or a telescope, after all. In the Bible, he used miracles to show he was real. So what’s the deal? Can miracles happen? And if not, does that mean there is no God? Or is there some way both science and miracles can be true?",
    responderName: "Pastor, Apostle Peter"
  },{
    id: 7,
    title: "DO PETS GO TO HEAVEN?",
    content: "Do pets go to heaven?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The Bible does not give any explicit teaching on whether pets/animals have souls, or whether pets/animals will be in heaven. However, we can use general biblical principles to develop some clarity on the subject. The Bible states that both man (Genesis 2:7) and animals (Genesis 1:30; 6:17; 7:15, 22) have the 'breath of life'; that is, both man and animals are living beings. The primary difference between human beings and animals is that humanity is made in the image and likeness of God (Genesis 1:26-27), while animals are not. Being made in the image and likeness of God means that human beings are like God in some ways; they are capable of spirituality; they have a mind, emotion, and will; and part of their being continues after death. If pets/animals do have a soul (or spirit, or immaterial aspect), it must therefore be of a different and lesser quality. This difference possibly means that pet/animal souls do not continue in existence after death. Another factor to consider regarding whether pets will be heaven is that animals are a part of God’s creative process in Genesis. God created the animals and said they were good (Genesis 1:25). Therefore, there is no reason why there could not be pets / animals on the new earth (Revelation 21:1). There will most definitely be animals during the millennial kingdom (Isaiah 11:6; 65:25). It is impossible to say definitively whether some of these animals might be the pets we had here on earth. We do know that God is just and that when we get to heaven we will find ourselves in complete agreement with His decision on this issue, whatever it may be.",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 8,
    title: "WHAT DOES THE BIBLE SAY ABOUT DINOSAURS?",
    content: "What does the Bible say about dinosaurs?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The topic of dinosaurs in the Bible is part of a larger ongoing debate within the Christian community over the age of the earth, the proper interpretation of Genesis, and how to interpret the physical evidence we find all around us. Those who believe in an older age for the earth tend to agree that the Bible does not mention dinosaurs, because, according to the old-earth paradigm, dinosaurs died out millions of years before the first man ever walked the earth, so the men who wrote the Bible could not have seen living dinosaurs. Those who believe in a younger age for the earth tend to agree that the Bible does mention dinosaurs, though it never actually uses the word 'dinosaur'. Instead, it uses the Hebrew word tanniyn, which is translated a few different ways in our English Bibles. Sometimes it's 'sea monster,' and sometimes it's 'serpent.' It is most commonly translated 'dragon' in the KJV. The tanniyn appears to have been some sort of giant reptile. These creatures are mentioned nearly thirty times in the Old Testament (e.g., Psalm 74:13; Isaiah 27:1; Jeremiah 51:34) and were found both on land and in the water. Another Hebrew word, livyathan, transliterated leviathan, is used six times in Scripture (e.g., Job 41:1; Psalm 104:26) and refers to some type of large, fierce sea creature. The description of leviathan in Job 41 gives the impression of a strong yet graceful, unstoppable creature against which weapons are unavailing: 'Nothing on earth is its equal' (Job 41:33).",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 9,
    title: "WHAT DOES THE BIBLE SAY ABOUT SEX BEFORE MARRIAGE?",
    content: "What does the Bible say about sex before marriage?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The Bible clearly condemns sexual sins: adultery (consensual sex between a married person and someone other than his or her spouse) (Proverbs 6:32; cf. 1 Corinthians 6:18 and Hebrews 13:4) and fornication (sexual immorality in general) are specified (Matthew 15:19; Romans 1:29; 1 Corinthians 5:1). Sex before marriage, or premarital sex, is not addressed in that exact term, but it does fall within the scope of sexual immorality. The Bible teaches that sex before marriage is immoral in a couple of different passages. One is 1 Corinthians 7:2, which says, “But since sexual immorality is occurring, each man should have sexual relations with his own wife, and each woman with her own husband.” In this verse, marriage is presented as the “cure” for sexual immorality. Sexual union within marriage, which is commended, is set against immorality, which is to be avoided. Thus, any sex outside of marriage is considered immoral. This would have to include premarital sex.",
    responderName: "Pastor, Apostle Peter"
  },{
    id: 10,
    title: "AN ANCIENT QUESTION",
    content: "Why would a good GOD allow bad things?",
    askedTime: "a week ago",
    updatedTime: "a day ago",
    status: "Answered",
    likes: 23,
    dislikes: 5,
    imgSrc: "images/pastors/Apostel_philippus.png",
    answerText: "Ever since the earth has had people living on it, these great questions have been asked: Where is God when bad things happen? Why won't he protect us from disaster? Why doesn't he punish the bad people? Deep thinkers call these questions the problem of evil. They wonder why there is evil at all if our world is guarded by a God who cares about us. If we have a good God, why do bad things happen? That last question really takes some tough thinking. A Greek philosopher named Epicurus asked it more than two thousand years ago. It seemed to him that if God and evil are both in the world, then God should use his powers to eliminate it. If he doesn't, the philosopher asked, why doesn't he? Does he lack the desire or does he lack the strength? That’s a tough one! Christians believe God is as good as it is possible to be, and as strong as it is possible to be. But if Epicurus were here, ...",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 11,
    title: "DOES SCIENCE MEAN MIRACLES CAN'T HAPPEN?",
    content: "Does science mean miracles can't happen?",
    askedTime: "two weeks ago",
    updatedTime: "3 days ago",
    status: "Answered",
    likes: 10,
    dislikes: 2,
    imgSrc: "images/pastors/Apostel_thomas.png",
    answerText: "These days, people take science for granted. You can watch something on your television set as it is happening on the other side of the world. You can fly through the sky in an airplane. A century or two ago, such things would have seemed greater miracles than five thousand dudes sharing a trout-burger. But we know that television and air flight are just matters of science. But that raises another big-league question. If science can explain so many things, does that mean there are no real miracles? The reason that’s such a big question is if there is only science (natural) and nothing miraculous (supernatural), where does that leave God? You can’t see him through a microscope or a telescope, after all. In the Bible, he used miracles to show he was real. So what’s the deal? Can miracles happen? And if not, does that mean there is no God? Or is there some way both science and miracles can be true?",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 12,
    title: "DO PETS GO TO HEAVEN?",
    content: "Do pets go to heaven?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The Bible does not give any explicit teaching on whether pets/animals have souls, or whether pets/animals will be in heaven. However, we can use general biblical principles to develop some clarity on the subject. The Bible states that both man (Genesis 2:7) and animals (Genesis 1:30; 6:17; 7:15, 22) have the 'breath of life'; that is, both man and animals are living beings. The primary difference between human beings and animals is that humanity is made in the image and likeness of God (Genesis 1:26-27), while animals are not. Being made in the image and likeness of God means that human beings are like God in some ways; they are capable of spirituality; they have a mind, emotion, and will; and part of their being continues after death. If pets/animals do have a soul (or spirit, or immaterial aspect), it must therefore be of a different and lesser quality. This difference possibly means that pet/animal souls do not continue in existence after death. Another factor to consider regarding whether pets will be heaven is that animals are a part of God’s creative process in Genesis. God created the animals and said they were good (Genesis 1:25). Therefore, there is no reason why there could not be pets / animals on the new earth (Revelation 21:1). There will most definitely be animals during the millennial kingdom (Isaiah 11:6; 65:25). It is impossible to say definitively whether some of these animals might be the pets we had here on earth. We do know that God is just and that when we get to heaven we will find ourselves in complete agreement with His decision on this issue, whatever it may be.",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 13,
    title: "WHAT DOES THE BIBLE SAY ABOUT DINOSAURS?",
    content: "What does the Bible say about dinosaurs?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The topic of dinosaurs in the Bible is part of a larger ongoing debate within the Christian community over the age of the earth, the proper interpretation of Genesis, and how to interpret the physical evidence we find all around us. Those who believe in an older age for the earth tend to agree that the Bible does not mention dinosaurs, because, according to the old-earth paradigm, dinosaurs died out millions of years before the first man ever walked the earth, so the men who wrote the Bible could not have seen living dinosaurs. Those who believe in a younger age for the earth tend to agree that the Bible does mention dinosaurs, though it never actually uses the word 'dinosaur'. Instead, it uses the Hebrew word tanniyn, which is translated a few different ways in our English Bibles. Sometimes it's 'sea monster,' and sometimes it's 'serpent.' It is most commonly translated 'dragon' in the KJV. The tanniyn appears to have been some sort of giant reptile. These creatures are mentioned nearly thirty times in the Old Testament (e.g., Psalm 74:13; Isaiah 27:1; Jeremiah 51:34) and were found both on land and in the water. Another Hebrew word, livyathan, transliterated leviathan, is used six times in Scripture (e.g., Job 41:1; Psalm 104:26) and refers to some type of large, fierce sea creature. The description of leviathan in Job 41 gives the impression of a strong yet graceful, unstoppable creature against which weapons are unavailing: 'Nothing on earth is its equal' (Job 41:33).",
    responderName: "Pastor, Apostle Peter"
  }, {
    id: 14,
    title: "WHAT DOES THE BIBLE SAY ABOUT SEX BEFORE MARRIAGE?",
    content: "What does the Bible say about sex before marriage?",
    askedTime: "a month ago",
    updatedTime: "two weeks ago",
    status: "Answered",
    likes: 50,
    dislikes: 5,
    imgSrc: "images/pastors/Apostle_andrea.png",
    answerText: "The Bible clearly condemns sexual sins: adultery (consensual sex between a married person and someone other than his or her spouse) (Proverbs 6:32; cf. 1 Corinthians 6:18 and Hebrews 13:4) and fornication (sexual immorality in general) are specified (Matthew 15:19; Romans 1:29; 1 Corinthians 5:1). Sex before marriage, or premarital sex, is not addressed in that exact term, but it does fall within the scope of sexual immorality. The Bible teaches that sex before marriage is immoral in a couple of different passages. One is 1 Corinthians 7:2, which says, “But since sexual immorality is occurring, each man should have sexual relations with his own wife, and each woman with her own husband.” In this verse, marriage is presented as the “cure” for sexual immorality. Sexual union within marriage, which is commended, is set against immorality, which is to be avoided. Thus, any sex outside of marriage is considered immoral. This would have to include premarital sex.",
    responderName: "Pastor, Apostle Peter"
  },
];

let debounceTimer;
// Function to bind debounce
function debounce(func, delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
}

// Function to handle input change and initiate debounced search
function handleInputChange() {
  debounce(performDeBounceSearch, 300); // 300 ms delay
}
// Function to debounce perform search
function performDeBounceSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase()
  const results = performSearch(query)
  displayResults(results)
}
// Function to perform search
function performSearch(query) {
  return questions.filter(q => q.title.toLowerCase().includes(query) || q.content.toLowerCase().includes(query));
}

// Function to display results for the popup
function displayResults(results) {
  const container = document.getElementById('searchResults');
  container.innerHTML = ''; // Clear previous results
  if (results.length === 0) {
    container.innerHTML = '<div>No results found</div>';
  } else {
    results.forEach(result => {
      const resultElement = document.createElement('div');
      resultElement.innerHTML = `
              <div>
                  <h4><a href="question_detail.html?id=${result.id}">${result.title}</a></h4>
                  <p>${result.content}</p>
              </div>
          `;
      container.appendChild(resultElement);
    });
    container.style.display = 'block'; // Shows the results container if hidden
    // Add click event listener for dynamic navigation
    container.querySelectorAll('div div').forEach(item => {
      item.addEventListener('click', function () {
        const link = item.querySelector('a');
        if (link) {
          window.location.href = link.href;
        }
      });
    });
  }
  container.style.display = 'block'; // Shows the results container if hidden
}

// Function to handle keypress search
function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent the default form submit behavior
    const query = document.getElementById('searchInput').value;
    window.location.href = "index.html?q=" + query;
  }
}

//update Question lists
function updateQuestionsContainer(results) {
  hidePopupSearchResults()
  const container = document.getElementById('questions-container');
  container.innerHTML = '<div class="question-header"><div>Questions</div><div></div><div></div><div>Asked</div><div>Answered</div><div></div><div></div><div>Status</div></div>'; // Include header
  if (results.length === 0) {
    container.innerHTML += '<div class="center">No questions found</div>';
  } else {
    results.forEach(result => {
      console.log(result);
      const questionElement = document.createElement('div');
      questionElement.classList.add('question-item');
      questionElement.innerHTML = `
                <img src="${result.imgSrc}" alt="Responder's Photo" class="responder-photo">
                <div class="question-details">
                    <div class="question-title"><a href="question_detail.html?id=${result.id}">${result.title}</a></div>
                    <div class="question-text">${result.content}</div>
                </div>
                <div><a href="ask.html?title=${result.title}&content=${result.content}">Ask similar</a></div>
                <div class="asked-time">${result.askedTime}</div>
                <div class="updated-time">${result.updatedTime}</div>
                <div class="likes-count">👍 ${result.likes}</div>
                <div class="dislikes-count">👎 ${result.dislikes}</div>
                <div class="question-status">${result.status}</div>
            `;
      container.appendChild(questionElement);
    });
  }
}

// Function to hide the search results dropdown
function hidePopupSearchResults() {
  const searchResults = document.getElementById('searchResults');
  if (searchResults) {
    searchResults.style.display = 'none';
  }
}

// Function to set pagination
function setupPagination(totalQuestions, questionsPerPage, currentPage) {
  const pageCount = Math.ceil(totalQuestions / questionsPerPage);
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Clear existing pagination links

  for (let i = 1; i <= pageCount; i++) {
    const pageLink = document.createElement('a');
    pageLink.href = `?page=${i}`;
    pageLink.innerText = i;
    pageLink.className = 'pagination-link';
    if (i === currentPage) {
      pageLink.classList.add('active');
    }
    paginationContainer.appendChild(pageLink);
  }
}