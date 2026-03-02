
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Modality } from "@google/genai";

interface Story {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  readTime: string;
  content?: string;
  quiz?: {
    question: string;
    options?: string[];
    correctAnswer?: string;
    type: 'multiple' | 'open';
  }[];
}

const STORIES: Story[] = [
  {
    id: 1,
    title: "Please Watch My Mule For Me",
    category: "Companions",
    description: "A beautiful story about the honesty and character of ‘Ali ibn Abi Talib (RA).",
    image: "https://picsum.photos/seed/nature1/400/300",
    readTime: "4 min",
    content: `Going to the masjid in Ramadan is so much fun! There are many people gathered at every prayer Alhamdulillah. There is excitement as the iftaar is prepared, dozens of plates passed around, one after another. Clusters of hungry children sit and stare at fat juicy dates, waiting for the adhaan to be called. And the parking lots of the masaajid are packed with cars.

Back in the time of the Prophet (peace be upon him) and his companions, do you picture something similar in your mind? Some things may have been different. There would be no cars, for one. How do you suppose people got to a masjid that was far away? On an animal!

One day, the sahabi ‘Ali ibn Abi Taalib (may Allah be pleased with him) went to a masjid. He saw a man standing at the door and asked him to watch his animal – a mule. ‘Ali planned to come back and pay the man two dirhams for watching his animal, but when he came back, the man had disappeared and so had the reins of the mule. The man had stolen the reins!

‘Ali was very patient; he did not get angry and start yelling for people to find the thief. Instead, he gave his servant Qanbar those two dirhams and asked him buy new reins.

What a surprise Qanbar found at the marketplace—he found those exact reins that the thief had stolen for two dirhams!

‘Ali said: “Indeed, the slave forbids himself from halal money by not being patient.”`,
    quiz: [
      {
        question: "What does ‘Ali ask the man at the masjid to do for him?",
        options: ["Put his shoes away", "Watch his mule", "Hold his turban"],
        correctAnswer: "Watch his mule",
        type: "multiple"
      },
      {
        question: "What was ‘Ali planning on doing after he finished at the masjid?",
        options: ["Paying the man some money for watching his animal", "Saying thank you to the stranger", "Going to the mall"],
        correctAnswer: "Paying the man some money for watching his animal",
        type: "multiple"
      },
      {
        question: "How do you think ‘Ali felt when he found out that something of his had been stolen? What can we learn from his behavior?",
        type: "open"
      }
    ]
  },
  {
    id: 2,
    title: "The Inheritance of Prophets",
    category: "Prophets",
    description: "Understanding what the Prophets truly left behind for us to inherit.",
    image: "https://picsum.photos/seed/nature2/400/300",
    readTime: "5 min",
    content: `One day, Abu Hurairah (RA) went to the marketplace in Madinah. He saw the people busy with their buying and selling, and he called out to them: "O people of the market! How helpless you are!"

They asked, "What do you mean, O Abu Hurairah?"

He replied, "The inheritance of the Messenger of Allah (SAW) is being distributed, and you are here! Why don't you go and take your share?"

They asked, "Where is it?"

He said, "In the Masjid."

The people rushed to the Masjid, and Abu Hurairah waited for them until they returned. When they came back, they looked disappointed. They said, "O Abu Hurairah, we went to the Masjid and entered it, but we did not see anything being distributed."

Abu Hurairah asked, "Did you not see anyone in the Masjid?"

They said, "Yes, we saw some people praying, some people reciting the Quran, and some people discussing what is Halal and Haram."

Abu Hurairah then said to them, "Woe to you! That is the inheritance of Muhammad (SAW)!"`,
    quiz: [
      {
        question: "Where did Abu Hurairah tell the people to go?",
        options: ["To the palace", "To the Masjid", "To the garden"],
        correctAnswer: "To the Masjid",
        type: "multiple"
      },
      {
        question: "What is the true inheritance of the Prophets?",
        options: ["Gold and Silver", "Knowledge and Worship", "Land and Houses"],
        correctAnswer: "Knowledge and Worship",
        type: "multiple"
      },
      {
        question: "Why do you think knowledge is more valuable than money?",
        type: "open"
      }
    ]
  },
  {
    id: 3,
    title: "Even a Bully Can Change!",
    category: "Companions",
    description: "The powerful transformation of ‘Umar ibn Al-Khattab (RA) from a harsh man to a leader of justice.",
    image: "https://picsum.photos/seed/nature3/400/300",
    readTime: "7 min",
    content: `Before he became a Muslim, ‘Umar ibn Al-Khattab was known for being very strong and very harsh. Many people were afraid of him. One day, he set out with his sword, intending to harm the Prophet Muhammad (SAW).

On his way, he met a man who told him that his own sister, Fatima, and her husband had already become Muslims! ‘Umar was furious and rushed to their house. Inside, he heard them reciting the Quran.

When he entered, he was very angry, but then he saw the parchment they were reading. It was Surah Ta-Ha. As he read the beautiful words of Allah, his heart began to soften. He realized that these words could not have come from a human being.

He immediately went to the Prophet (SAW) and declared his faith. The man who was once the biggest enemy of Islam became its strongest protector. He learned that true strength is not in being a bully, but in standing up for the truth with justice and kindness.`,
    quiz: [
      {
        question: "What was ‘Umar's intention when he first set out with his sword?",
        options: ["To go hunting", "To harm the Prophet (SAW)", "To protect his sister"],
        correctAnswer: "To harm the Prophet (SAW)",
        type: "multiple"
      },
      {
        question: "Which Surah of the Quran did ‘Umar read that changed his heart?",
        options: ["Surah Al-Fatiha", "Surah Ta-Ha", "Surah Al-Baqarah"],
        correctAnswer: "Surah Ta-Ha",
        type: "multiple"
      },
      {
        question: "What does this story teach us about people who seem 'bad' or 'mean'?",
        type: "open"
      }
    ]
  },
  {
    id: 4,
    title: "I’m Sorry I’m Late",
    category: "Scholars",
    description: "A famous debate featuring the great Imam Abu Hanifa and his brilliant logic.",
    image: "https://picsum.photos/seed/nature4/400/300",
    readTime: "6 min",
    content: `Once, a group of people who did not believe in Allah challenged the Muslims to a debate. They wanted to prove that the universe was created by chance. The Muslims chose a young student named Abu Hanifa to represent them.

A time was set for the debate, but when the time came, Abu Hanifa was nowhere to be found. The challengers started laughing and saying, "He is too scared to face us!"

Finally, Abu Hanifa arrived, looking tired. He apologized and said, "I'm sorry I'm late. I was on the other side of the river and there was no boat. But suddenly, I saw some trees fall down, the wood cut itself into planks, and the planks joined together to form a perfect boat. I jumped on it and it brought me here!"

The challengers laughed even louder. "You are crazy! A boat cannot build itself without a carpenter!"

Abu Hanifa smiled and said, "If a simple boat cannot build itself, how can you say that this entire universe, with the sun, the moon, and the stars, was created without a Creator?"

The challengers were silenced by his brilliant logic.`,
    quiz: [
      {
        question: "Why did Abu Hanifa say he was late?",
        options: ["He overslept", "He saw a boat build itself", "He got lost"],
        correctAnswer: "He saw a boat build itself",
        type: "multiple"
      },
      {
        question: "What was the main point of Abu Hanifa's story?",
        options: ["That he is a good sailor", "That everything needs a creator", "That trees are strong"],
        correctAnswer: "That everything needs a creator",
        type: "multiple"
      },
      {
        question: "Can you think of another example in nature that shows Allah is the Creator?",
        type: "open"
      }
    ]
  },
  {
    id: 5,
    title: "Here Comes ‘Umar – Run!",
    category: "Companions",
    description: "Another engaging story about the formidable and respected ‘Umar ibn Al-Khattab (RA).",
    image: "https://picsum.photos/seed/nature5/400/300",
    readTime: "4 min",
    content: `Even after becoming a Muslim, ‘Umar (RA) remained a very awe-inspiring figure. One day, some women were sitting with the Prophet (SAW), talking loudly and asking him many questions.

Suddenly, they heard ‘Umar's voice outside, asking for permission to enter. As soon as they heard him, the women scrambled to hide behind a curtain, becoming very quiet.

When ‘Umar entered, he saw the Prophet (SAW) smiling. ‘Umar asked, "Why are you smiling, O Messenger of Allah?"

The Prophet (SAW) replied, "I am amazed by these women who were talking loudly, but as soon as they heard your voice, they rushed to hide!"

‘Umar turned to the curtain and said, "O enemies of your own souls! Do you fear me but not the Messenger of Allah?"

They replied, "Yes, because you are harsher and sterner than the Messenger of Allah."

The Prophet (SAW) then said, "O ‘Umar! By the One in Whose hand is my soul, if the Shaytan were to see you walking on a path, he would certainly take a different path!"`,
    quiz: [
      {
        question: "What did the women do when they heard ‘Umar coming?",
        options: ["They started singing", "They hid behind a curtain", "They ran outside"],
        correctAnswer: "They hid behind a curtain",
        type: "multiple"
      },
      {
        question: "What did the Prophet (SAW) say about Shaytan and ‘Umar?",
        options: ["Shaytan likes ‘Umar", "Shaytan would take a different path", "Shaytan is stronger than ‘Umar"],
        correctAnswer: "Shaytan would take a different path",
        type: "multiple"
      },
      {
        question: "Why do you think people respected and feared ‘Umar so much?",
        type: "open"
      }
    ]
  },
  {
    id: 6,
    title: "See How Much Allah Loves You",
    category: "Wisdom",
    description: "Reflecting on the infinite mercy and love that Allah has for His creation.",
    image: "https://picsum.photos/seed/nature6/400/300",
    readTime: "5 min",
    content: `After a battle, some captives were brought to the Prophet (SAW). Among them was a woman who was frantically searching for her lost baby. Every time she found a child among the captives, she would press it to her chest and nurse it.

When she finally found her own baby, she grabbed him, held him tight, and began to nurse him with such love and relief.

The Prophet (SAW) watched her and then turned to his companions. He asked, "Do you think this woman would ever throw her child into a fire?"

They replied, "No, by Allah, not if she has the power to prevent it!"

The Prophet (SAW) then said, "Allah is more merciful to His servants than this woman is to her child."

This story reminds us that no matter what mistakes we make, Allah's love and mercy are always there for us if we turn back to Him.`,
    quiz: [
      {
        question: "What was the woman searching for?",
        options: ["Her gold", "Her baby", "Her home"],
        correctAnswer: "Her baby",
        type: "multiple"
      },
      {
        question: "Who is more merciful than the loving mother in the story?",
        options: ["The Prophet (SAW)", "Allah", "The King"],
        correctAnswer: "Allah",
        type: "multiple"
      },
      {
        question: "How does knowing Allah loves you more than a mother make you feel?",
        type: "open"
      }
    ]
  },
  {
    id: 7,
    title: "Heroes Come in Miniature Too!",
    category: "Companions",
    description: "The bravery of Asmaa' bint Abi Bakr (RA) during the Hijrah of the Prophet (SAW).",
    image: "https://picsum.photos/seed/nature7/400/300",
    readTime: "6 min",
    content: `When the Prophet (SAW) and Abu Bakr (RA) were migrating from Makkah to Madinah, they had to hide in a cave called Thawr for three days. It was a very dangerous time because the enemies were searching everywhere for them.

Abu Bakr's daughter, Asmaa', was a young woman at the time. Every night, she would secretly carry food and water to them in the cave. To get there, she had to climb a steep and rocky mountain in the dark, all while being careful not to be seen.

One night, she realized she had nothing to tie the food bags with. She took her own waist-belt (nitaq), tore it into two pieces, and used them to secure the supplies. Because of this, the Prophet (SAW) gave her the title "Dhatun-Nitaqayn" (The One with Two Belts).

Even when the enemies came to her house and slapped her to make her tell them where her father was, she remained brave and did not say a word. She showed that you don't have to be a soldier to be a hero.`,
    quiz: [
      {
        question: "Where were the Prophet (SAW) and Abu Bakr hiding?",
        options: ["In a house", "In Cave Thawr", "In a garden"],
        correctAnswer: "In Cave Thawr",
        type: "multiple"
      },
      {
        question: "What title did the Prophet (SAW) give to Asmaa'?",
        options: ["The Brave Girl", "The One with Two Belts", "The Mountain Climber"],
        correctAnswer: "The One with Two Belts",
        type: "multiple"
      },
      {
        question: "What is one way you can be brave like Asmaa' in your daily life?",
        type: "open"
      }
    ]
  },
  {
    id: 8,
    title: "The One Who Made Allah Laugh",
    category: "Hadith",
    description: "A touching Hadith Qudsi about the last person to enter Paradise.",
    image: "https://picsum.photos/seed/nature8/400/300",
    readTime: "5 min",
    content: `The Prophet (SAW) told us about the very last person to enter Paradise. This man will crawl out of the Hellfire, and Allah will tell him, "Go and enter Paradise."

The man will go to Paradise, but it will appear to him as if it is full. He will return and say, "O Lord, I found it full." Allah will tell him again, "Go and enter Paradise."

This will happen three times. Finally, Allah will say, "Go and enter Paradise, for you will have the equivalent of the world and ten times more!"

The man will say, "Are You mocking me, though You are the King?"

The Prophet (SAW) laughed when he told this part, and he said that Allah laughs at the man's surprise. Allah will tell him, "I am not mocking you, but I am Capable of doing whatever I will."

Even the person with the "smallest" place in Paradise will have more than we can ever imagine!`,
    quiz: [
      {
        question: "How many times more than the world will the last person get in Paradise?",
        options: ["Two times", "Five times", "Ten times"],
        correctAnswer: "Ten times",
        type: "multiple"
      },
      {
        question: "Why did the man ask if Allah was mocking him?",
        options: ["He was angry", "He couldn't believe how much he was getting", "He was lost"],
        correctAnswer: "He couldn't believe how much he was getting",
        type: "multiple"
      },
      {
        question: "What is one thing you are looking forward to seeing in Paradise?",
        type: "open"
      }
    ]
  },
  {
    id: 9,
    title: "A Special Collection About Imam al-Bukhaari",
    category: "Scholars",
    description: "Stories from the life of the master of Hadith, Imam al-Bukhaari.",
    image: "https://picsum.photos/seed/nature9/400/300",
    readTime: "8 min",
    content: `Imam al-Bukhaari was famous for his incredible memory. Once, when he arrived in Baghdad, the scholars there wanted to test him. They chose ten people, and each person was given ten Hadiths. But there was a trick: they switched the chains of narrators (the list of people who told the story) with the wrong Hadiths!

One by one, the ten men recited their "mixed-up" Hadiths to Imam al-Bukhaari. After each one, the Imam simply said, "I do not know it." The people who didn't know about the test thought he was not very smart.

But when they were finished, Imam al-Bukhaari turned to the first man and said, "Your first Hadith was this, but its correct chain is that. Your second was this, but its correct chain is that..." He went through all 100 Hadiths, correcting every single one from memory!

He didn't just remember the correct versions; he even remembered the wrong versions they had just made up! This showed everyone that Allah had blessed him with a mind like no other to protect the words of the Prophet (SAW).`,
    quiz: [
      {
        question: "How many Hadiths did the scholars use to test Imam al-Bukhaari?",
        options: ["10", "50", "100"],
        correctAnswer: "100",
        type: "multiple"
      },
      {
        question: "What did Imam al-Bukhaari do that amazed the scholars?",
        options: ["He wrote a new book", "He corrected all the mixed-up Hadiths from memory", "He won a race"],
        correctAnswer: "He corrected all the mixed-up Hadiths from memory",
        type: "multiple"
      },
      {
        question: "Why is it important to have a good memory when learning about Islam?",
        type: "open"
      }
    ]
  },
  {
    id: 10,
    title: "The Cow and the Good Son",
    category: "Wisdom",
    description: "A story from Bani Isra'eel about the rewards of being good to one's parents.",
    image: "https://picsum.photos/seed/nature10/400/300",
    readTime: "7 min",
    content: `There was once a young man from Bani Isra'eel who was very kind to his father. One day, while his father was sleeping, a group of men came to buy a precious jewel from the young man for a very high price. The key to the cabinet where the jewel was kept was under his father's pillow.

The young man refused to wake his father, even though he would have made a lot of money. He chose the comfort of his father over the wealth of this world. Allah rewarded him in an amazing way.

Later, the people of Bani Isra'eel were commanded by Allah to find a very specific cow. After searching everywhere, they found that only this young man owned such a cow. Because it was so rare, they had to pay him its weight in gold to buy it!

The young man became very wealthy, all because he chose to be patient and respectful to his father. Allah never lets the reward of the good-doers go to waste.`,
    quiz: [
      {
        question: "Why did the young man refuse to sell the jewel?",
        options: ["He didn't like the price", "He didn't want to wake his sleeping father", "He lost the key"],
        correctAnswer: "He didn't want to wake his sleeping father",
        type: "multiple"
      },
      {
        question: "How did Allah reward the young man for his kindness?",
        options: ["He found a treasure", "He sold a rare cow for its weight in gold", "He became a king"],
        correctAnswer: "He sold a rare cow for its weight in gold",
        type: "multiple"
      },
      {
        question: "What is one way you can show kindness to your parents today?",
        type: "open"
      }
    ]
  },
  {
    id: 11,
    title: "A Case of Sour Grapes",
    category: "Prophets",
    description: "A story featuring the wisdom of Prophet Sulayman and Prophet Dawood (AS).",
    image: "https://picsum.photos/seed/nature11/400/300",
    readTime: "5 min",
    content: `Prophet Dawood (AS) was a wise king, and his son Sulayman (AS) was even wiser. One day, two men came to Dawood (AS) with a problem. One man's sheep had entered the other man's vineyard at night and eaten all the grapes!

Dawood (AS) ruled that the owner of the vineyard should take the sheep as compensation for his lost crop. It seemed like a fair trade.

But young Sulayman (AS) suggested a different idea. He said, "The owner of the vineyard should take the sheep and benefit from their milk and wool for a while. Meanwhile, the owner of the sheep should go to the vineyard and replant it until the grapes grow back. When the vineyard is back to how it was, they should trade back!"

Dawood (AS) realized his son's judgment was even more just, as it allowed both men to eventually get their original property back. This story shows us that wisdom can come from the young, and we should always look for solutions that help everyone.`,
    quiz: [
      {
        question: "What did the sheep eat in the story?",
        options: ["Grass", "Grapes", "Apples"],
        correctAnswer: "Grapes",
        type: "multiple"
      },
      {
        question: "What was Sulayman's (AS) wise suggestion?",
        options: ["To sell the sheep", "To have the sheep owner fix the vineyard", "To give the vineyard to the sheep owner"],
        correctAnswer: "To have the sheep owner fix the vineyard",
        type: "multiple"
      },
      {
        question: "Why is it important to listen to different ideas when solving a problem?",
        type: "open"
      }
    ]
  },
  {
    id: 12,
    title: "Blessed Money",
    category: "Wisdom",
    description: "How Barakah (blessing) can make a small amount of wealth go a long way.",
    image: "https://picsum.photos/seed/nature12/400/300",
    readTime: "4 min",
    content: `Have you ever heard of "Barakah"? It means a blessing from Allah that makes something small become enough, or something simple become great.

Once, a poor man came to the Prophet (SAW) asking for help. The Prophet (SAW) didn't just give him money; he asked the man what he had at home. The man said he had a piece of cloth and a wooden bowl. The Prophet (SAW) sold them for two dirhams.

He gave the man the money and said, "Buy food with one dirham, and buy an axe-head with the other." When the man brought the axe-head, the Prophet (SAW) himself fixed a handle to it and told the man to go and cut wood to sell.

The man worked hard, and with Allah's Barakah, he soon had enough money to buy clothes and food for his family. He learned that earning a living with your own hands is blessed by Allah.`,
    quiz: [
      {
        question: "What did the Prophet (SAW) help the man buy?",
        options: ["A sword", "An axe-head", "A horse"],
        correctAnswer: "An axe-head",
        type: "multiple"
      },
      {
        question: "What does 'Barakah' mean?",
        options: ["Being rich", "A blessing from Allah", "Working hard"],
        correctAnswer: "A blessing from Allah",
        type: "multiple"
      },
      {
        question: "How can you bring Barakah into your own life?",
        type: "open"
      }
    ]
  },
  {
    id: 13,
    title: "Whoever Speaks of ‘Umar Speaks of Justice",
    category: "Companions",
    description: "Exploring the legendary fairness and justice of the second Caliph of Islam.",
    image: "https://picsum.photos/seed/nature13/400/300",
    readTime: "6 min",
    content: `When ‘Umar (RA) was the Caliph, he used to walk through the streets of Madinah at night to see if anyone needed help. One night, he heard a woman complaining about him! She didn't know it was ‘Umar she was talking to.

She was boiling a pot of water with stones in it to make her hungry children think food was coming so they would fall asleep. She said, "‘Umar is the leader, but he doesn't know we are hungry!"

‘Umar was heartbroken. He didn't get angry at her. Instead, he rushed to the storehouse, grabbed a heavy bag of flour and some oil, and carried it on his own back to her house. His servant offered to carry it, but ‘Umar said, "Will you carry my sins for me on the Day of Judgment?"

He cooked the food for the family himself and stayed until the children were full and happy. He showed that a true leader is a servant to his people.`,
    quiz: [
      {
        question: "What was the woman boiling in the pot?",
        options: ["Soup", "Stones", "Rice"],
        correctAnswer: "Stones",
        type: "multiple"
      },
      {
        question: "Why did ‘Umar (RA) carry the flour himself?",
        options: ["He wanted to exercise", "He felt responsible as a leader", "There was no one else"],
        correctAnswer: "He felt responsible as a leader",
        type: "multiple"
      },
      {
        question: "What does it mean to be a 'just' leader?",
        type: "open"
      }
    ]
  },
  {
    id: 14,
    title: "Let It Go Umm Musa",
    category: "Prophets",
    description: "The incredible trust in Allah shown by the mother of Prophet Musa (AS).",
    image: "https://picsum.photos/seed/nature14/400/300",
    readTime: "5 min",
    content: `Imagine being a mother and being told to put your tiny baby in a basket and let him float away on a big, fast river! This is exactly what Allah commanded the mother of Musa (AS) to do to save him from the cruel Pharaoh.

Her heart was full of fear, but she had Tawakul—complete trust in Allah. She let the basket go into the Nile River. Allah guided the basket straight to the palace of Pharaoh, where Pharaoh's wife, Aasiya, found him and loved him instantly.

Allah promised Musa's mother that He would return her baby to her. And He did! Pharaoh needed a nurse for the baby, and Musa (AS) would not drink from anyone except his own mother. She was brought to the palace to care for her own son, and she was even paid for it!

When we trust Allah and "let go" of our fears, He always takes care of us in ways we never expected.`,
    quiz: [
      {
        question: "Where did Musa's mother put the baby?",
        options: ["In a cradle", "In a basket on the river", "In a cave"],
        correctAnswer: "In a basket on the river",
        type: "multiple"
      },
      {
        question: "How did Allah return Musa (AS) to his mother?",
        options: ["By a miracle", "By making him only drink from her", "By sending an angel"],
        correctAnswer: "By making him only drink from her",
        type: "multiple"
      },
      {
        question: "What is something you find hard to trust Allah with? How can this story help you?",
        type: "open"
      }
    ]
  },
  {
    id: 15,
    title: "Like a Ninja",
    category: "Prophets",
    description: "The courageous role played by the sister of Prophet Musa (AS) in his survival.",
    image: "https://picsum.photos/seed/nature15/400/300",
    readTime: "4 min",
    content: `While Musa's mother was full of worry, his sister was like a secret agent! After their mother put Musa (AS) in the river, his sister followed the basket from a distance, hiding behind trees and bushes so no one would see her.

She watched as the basket was picked up by the people of Pharaoh's palace. She didn't run away in fear; she stayed close and listened. When she saw that the baby was crying and wouldn't eat, she bravely stepped forward.

She didn't say, "That's my brother!" Instead, she wisely asked, "Shall I point you to a family who can care for him for you?" They agreed, and she led them straight back to her mother!

Her bravery and quick thinking were a big part of Allah's plan. It shows that even young people can play a huge role in helping their families and serving Allah.`,
    quiz: [
      {
        question: "What did Musa's sister do after he was put in the river?",
        options: ["She went home to cry", "She followed the basket secretly", "She went to play"],
        correctAnswer: "She followed the basket secretly",
        type: "multiple"
      },
      {
        question: "How did she help the people in the palace?",
        options: ["She gave them gold", "She told them where to find a nurse", "She cooked for them"],
        correctAnswer: "She told them where to find a nurse",
        type: "multiple"
      },
      {
        question: "How can you use your 'quick thinking' to help someone today?",
        type: "open"
      }
    ]
  },
  {
    id: 16,
    title: "The Power of Tawbah",
    category: "Wisdom",
    description: "A moving story from Bani Isra'eel about the transformative power of sincere repentance.",
    image: "https://picsum.photos/seed/nature16/400/300",
    readTime: "6 min",
    content: `During the time of Musa (AS), there was a long drought. The people were thirsty, and the plants were dying. Musa (AS) led 70,000 people to the desert to pray for rain. But the rain didn't come.

Allah told Musa (AS), "There is one person among you who has been disobeying Me for 40 years. The rain will not fall until he leaves." Musa (AS) called out to the crowd, asking the sinner to step forward.

The man felt so ashamed. He knew he was the one. He covered his face and cried out to Allah in his heart, "O Allah, I have disobeyed You for 40 years and You kept my secret. Today, I repent to You sincerely. Please forgive me and don't shame me!"

Before he even moved, the clouds gathered and the rain began to pour! Musa (AS) was confused. "O Allah, no one left, but the rain came!" Allah replied, "O Musa, I gave them rain because of the same person who caused it to stop. He has returned to Me."

Allah loves repentance so much that He can change a whole situation because of one person's sincere prayer.`,
    quiz: [
      {
        question: "Why did the rain stop in the story?",
        options: ["Because it was summer", "Because of one person's disobedience", "Because Musa (AS) forgot to pray"],
        correctAnswer: "Because of one person's disobedience",
        type: "multiple"
      },
      {
        question: "What did the man do that made the rain fall?",
        options: ["He left the crowd", "He repented sincerely in his heart", "He brought water"],
        correctAnswer: "He repented sincerely in his heart",
        type: "multiple"
      },
      {
        question: "What does 'Tawbah' mean to you?",
        type: "open"
      }
    ]
  },
  {
    id: 17,
    title: "A Perfect Woman",
    category: "Prophets",
    description: "The story of Aasiya (AS), the wife of Fir'aun, and her unwavering faith.",
    image: "https://picsum.photos/seed/nature17/400/300",
    readTime: "5 min",
    content: `Aasiya (AS) was the queen of Egypt, married to the most powerful and cruel man of his time, Pharaoh. She had all the jewels, palaces, and servants she could ever want. But she realized that none of it mattered compared to the truth of Allah.

When she saw the miracles of Musa (AS), she believed in Allah. Pharaoh was furious and tried to make her change her mind by being very cruel to her. But Aasiya's faith was like a mountain—it could not be moved.

While she was being punished, she looked up at the sky and prayed, "My Lord, build for me near You a house in Paradise." Allah showed her her home in Jannah right then, and she smiled as her soul left her body.

She is one of the four greatest women in history. She showed us that even in the most difficult places, we can choose to be good and stay close to Allah.`,
    quiz: [
      {
        question: "Who was Aasiya (AS) married to?",
        options: ["Prophet Musa", "Pharaoh", "A kind king"],
        correctAnswer: "Pharaoh",
        type: "multiple"
      },
      {
        question: "What did Aasiya ask Allah for in her prayer?",
        options: ["More gold", "A house in Paradise", "To be the queen"],
        correctAnswer: "A house in Paradise",
        type: "multiple"
      },
      {
        question: "What can we learn from Aasiya's bravery?",
        type: "open"
      }
    ]
  },
  {
    id: 18,
    title: "I Preferred the Dog to Myself",
    category: "Wisdom",
    description: "A story of extreme selflessness and compassion towards Allah's creatures.",
    image: "https://picsum.photos/seed/nature18/400/300",
    readTime: "4 min",
    content: `The Prophet (SAW) told us about a man who was walking on a very hot day. He was so thirsty that his throat felt like it was on fire. He finally found a well, climbed down, and drank his fill.

When he came back up, he saw a dog panting and licking the moist earth because it was so thirsty. The man thought, "This dog is feeling the same thirst that I was feeling."

But there was no bucket! So the man climbed back down the well, filled his leather shoe with water, held it in his teeth as he climbed up, and gave the water to the dog.

Allah was so pleased with this simple act of kindness that He forgave all of the man's sins. The companions asked, "O Messenger of Allah, is there a reward for being kind to animals?" He replied, "There is a reward for being kind to every living thing."`,
    quiz: [
      {
        question: "How did the man carry the water for the dog?",
        options: ["In a bucket", "In his shoe", "In his hands"],
        correctAnswer: "In his shoe",
        type: "multiple"
      },
      {
        question: "What was the man's reward for helping the dog?",
        options: ["He found gold", "Allah forgave his sins", "He got a new horse"],
        correctAnswer: "Allah forgave his sins",
        type: "multiple"
      },
      {
        question: "How can you show kindness to animals or nature this week?",
        type: "open"
      }
    ]
  },
  {
    id: 19,
    title: "The Great Grandfather of the Prophet",
    category: "History",
    description: "The life and legacy of Hashim, the noble ancestor of Prophet Muhammad (SAW).",
    image: "https://picsum.photos/seed/nature19/400/300",
    readTime: "5 min",
    content: `Long before the Prophet (SAW) was born, his great-grandfather Hashim was a leader in Makkah. He was famous for his generosity. His real name was Amr, but people called him "Hashim" (which means "The Crusher").

Why? Because during a time of famine, he traveled all the way to Syria to buy bread. He brought it back to Makkah and crushed it into a big pot of soup to feed all the hungry pilgrims. He was the first one to organize the famous trade caravans of the summer and winter mentioned in the Quran.

Hashim taught his family that being a leader means taking care of others, especially when times are hard. This noble character was passed down through the generations until it reached our beloved Prophet Muhammad (SAW).`,
    quiz: [
      {
        question: "What does the name 'Hashim' mean?",
        options: ["The Strong", "The Crusher", "The Traveler"],
        correctAnswer: "The Crusher",
        type: "multiple"
      },
      {
        question: "What did Hashim do to help the hungry people?",
        options: ["He gave them money", "He made bread and soup for them", "He built a new well"],
        correctAnswer: "He made bread and soup for them",
        type: "multiple"
      },
      {
        question: "Why is it important to know about the Prophet's (SAW) family?",
        type: "open"
      }
    ]
  },
  {
    id: 20,
    title: "The Most Just",
    category: "Prophets",
    description: "A story highlighting the judicial wisdom of Prophet Dawood (AS).",
    image: "https://picsum.photos/seed/nature20/400/300",
    readTime: "5 min",
    content: `Prophet Dawood (AS) was not only a Prophet but also a king and a judge. One day, two men climbed over the wall of his private prayer room. Dawood (AS) was startled, but they said, "Don't be afraid! We have a dispute."

One man said, "This is my brother. He has 99 ewes (female sheep), and I have only one. But he says, 'Give it to me,' and he has overpowered me in speech!"

Dawood (AS) immediately said, "He has certainly wronged you by demanding your ewe!" But then Dawood (AS) realized this was a test from Allah. He fell down in prostration and asked for forgiveness, realizing he should have listened to both sides more carefully.

This story teaches us that even the best of people can make mistakes, and the most important thing is to turn back to Allah and always seek the full truth before making a judgment.`,
    quiz: [
      {
        question: "How many sheep did the two men have together?",
        options: ["50", "100", "200"],
        correctAnswer: "100",
        type: "multiple"
      },
      {
        question: "What did Dawood (AS) do when he realized he was being tested?",
        options: ["He got angry", "He asked for forgiveness and prostrated", "He ran away"],
        correctAnswer: "He asked for forgiveness and prostrated",
        type: "multiple"
      },
      {
        question: "Why should we always listen to 'both sides' of a story?",
        type: "open"
      }
    ]
  },
  {
    id: 21,
    title: "One Wish",
    category: "Prophets",
    description: "A touching moment from the life of RasulAllah (SAW) regarding his wishes for his Ummah.",
    image: "https://picsum.photos/seed/nature21/400/300",
    readTime: "4 min",
    content: `Every Prophet was given one special prayer (Dua) that Allah promised to answer. Most Prophets used their special Dua for something in this world or for their people during their lifetime.

But our beloved Prophet Muhammad (SAW) did something different. He said, "I have saved my special Dua for the Day of Judgment, so that I can use it to ask Allah to forgive my Ummah (followers)."

Can you imagine how much he loves us? Even though he hasn't met us, he was thinking about us and saving his most powerful prayer to help us when we need it most. This is why we should always send Salawat (blessings) upon him and try our best to follow his beautiful example.`,
    quiz: [
      {
        question: "When did the Prophet (SAW) save his special Dua for?",
        options: ["For his family", "For the Day of Judgment", "For a new house"],
        correctAnswer: "For the Day of Judgment",
        type: "multiple"
      },
      {
        question: "Who did the Prophet (SAW) want to help with his special Dua?",
        options: ["Only himself", "His followers (Ummah)", "The kings of the world"],
        correctAnswer: "His followers (Ummah)",
        type: "multiple"
      },
      {
        question: "How can you show your love for the Prophet (SAW) today?",
        type: "open"
      }
    ]
  },
  {
    id: 22,
    title: "You Came Early",
    category: "Prophets",
    description: "A story about Prophet Adam (AS) and the meeting of souls.",
    image: "https://picsum.photos/seed/nature22/400/300",
    readTime: "5 min",
    content: `When Allah created Adam (AS), He showed him all of his future children (all of us!). Adam (AS) saw one soul that had a beautiful light between his eyes. He asked, "O Lord, who is this?" Allah said, "This is your son Dawood."

Adam (AS) noticed that Dawood (AS) was only given 60 years to live. Adam (AS) said, "O Lord, give him 40 years from my own life." Allah agreed. Adam (AS) was supposed to live for 1,000 years.

When Adam (AS) was 960 years old, the Angel of Death came to him. Adam (AS) said, "You came early! Don't I have 40 years left?" He had forgotten his gift to Dawood!

The Angel reminded him, and Adam (AS) accepted it. This story shows us that humans are naturally forgetful, but it also shows the beautiful generosity of the first father of humanity.`,
    quiz: [
      {
        question: "How many years did Adam (AS) give to Dawood (AS)?",
        options: ["10", "40", "100"],
        correctAnswer: "40",
        type: "multiple"
      },
      {
        question: "Why did Adam (AS) think the Angel of Death was early?",
        options: ["He was busy", "He forgot he gave 40 years away", "He was sleeping"],
        correctAnswer: "He forgot he gave 40 years away",
        type: "multiple"
      },
      {
        question: "What is something you sometimes forget to do? How can you remember better?",
        type: "open"
      }
    ]
  },
  {
    id: 23,
    title: "The Power of Good Company",
    category: "Wisdom",
    description: "How the people we surround ourselves with can change our destiny.",
    image: "https://picsum.photos/seed/nature23/400/300",
    readTime: "5 min",
    content: `The Prophet (SAW) gave us a beautiful example of how our friends affect us. He said that a good friend is like a person who sells perfume. Even if you don't buy any perfume, just being near them makes you smell nice!

On the other hand, a bad friend is like a blacksmith working with a hot fire. Even if you don't get burned, the smoke and the smell will still get on your clothes.

This means that if we hang out with people who are kind, honest, and pray, we will start to become like them. But if we hang out with people who lie or are mean, we might start to pick up their bad habits too. Choose your "perfume sellers" wisely!`,
    quiz: [
      {
        question: "What is a good friend compared to in the story?",
        options: ["A baker", "A perfume seller", "A teacher"],
        correctAnswer: "A perfume seller",
        type: "multiple"
      },
      {
        question: "What happens if you sit near a blacksmith?",
        options: ["You get gold", "The smoke gets on your clothes", "You learn to cook"],
        correctAnswer: "The smoke gets on your clothes",
        type: "multiple"
      },
      {
        question: "What qualities do you look for in a good friend?",
        type: "open"
      }
    ]
  },
  {
    id: 24,
    title: "Don’t Judge",
    category: "Wisdom",
    description: "A lesson in humility and the dangers of judging others' spiritual states.",
    image: "https://picsum.photos/seed/nature24/400/300",
    readTime: "4 min",
    content: `There was once a man who had committed 99 murders. He wanted to change, so he asked a monk, "Can I be forgiven?" The monk said, "No, you have done too much evil." The man was so upset that he killed the monk too, making it 100.

But he still wanted to repent. He found a wise scholar who said, "Of course you can be forgiven! Who can stand between you and Allah's mercy? But you must leave this bad town and go to a town where people are good."

On his way to the good town, the man died. The angels of Mercy and the angels of Punishment argued over him. Allah commanded the earth to move so that he was closer to the good town by just a few inches.

Because he was closer to the good town, the angels of Mercy took him. This shows us that Allah's mercy is bigger than any sin, and we should never judge someone's future based on their past.`,
    quiz: [
      {
        question: "How many people did the man kill in total?",
        options: ["1", "99", "100"],
        correctAnswer: "100",
        type: "multiple"
      },
      {
        question: "Why did the angels of Mercy take the man?",
        options: ["He was a king", "He was closer to the good town", "He was very old"],
        correctAnswer: "He was closer to the good town",
        type: "multiple"
      },
      {
        question: "Why should we never give up on someone who wants to change?",
        type: "open"
      }
    ]
  },
  {
    id: 25,
    title: "Then What Will Happen?",
    category: "Prophets",
    description: "A profound conversation between Prophet Musa (AS) and Allah.",
    image: "https://picsum.photos/seed/nature25/400/300",
    readTime: "5 min",
    content: `Prophet Musa (AS) once asked Allah about the Day of Judgment. He asked, "O Lord, what will happen when the sun is folded up and the stars fall?" Allah described the great events of that day.

Musa (AS) kept asking, "And then what will happen?" Allah described the gathering of all humanity. Musa (AS) asked again, "And then what?" Allah described the scales of justice and the crossing of the bridge.

Finally, Musa (AS) asked, "And after everyone is in Paradise or... elsewhere... what will happen then?"

Allah replied with something beautiful: "Then, there will be no more 'then.' There will only be eternity."

This reminds us that this life is just a short journey, and our real home is the one that lasts forever. We should work hard now so that our "forever" is full of peace and joy.`,
    quiz: [
      {
        question: "What did Musa (AS) ask Allah about?",
        options: ["The weather", "The Day of Judgment", "How to build a house"],
        correctAnswer: "The Day of Judgment",
        type: "multiple"
      },
      {
        question: "What did Allah say happens after everything is finished?",
        options: ["We start over", "There is only eternity", "We go to sleep"],
        correctAnswer: "There is only eternity",
        type: "multiple"
      },
      {
        question: "How does thinking about 'forever' change how you act today?",
        type: "open"
      }
    ]
  },
  {
    id: 26,
    title: "Ibrahim and Namrud",
    category: "Prophets",
    description: "The epic confrontation between the Prophet of Truth and the arrogant tyrant.",
    image: "https://picsum.photos/seed/nature26/400/300",
    readTime: "7 min",
    content: `Namrud was a king who was so arrogant that he thought he was a god. When Prophet Ibrahim (AS) came to him, Namrud asked, "Who is your Lord?" Ibrahim (AS) said, "My Lord is the One who gives life and causes death."

Namrud laughed and said, "I can do that too!" He brought two prisoners, killed one, and let the other go. "See? I gave life and caused death!"

Ibrahim (AS) didn't argue with his silly logic. Instead, he gave a challenge that Namrud could never meet. Ibrahim (AS) said, "Indeed, Allah brings the sun from the East. So, you bring it from the West!"

Namrud was completely silenced. He was a powerful king, but he couldn't even move a single star. This story shows us that no matter how powerful a human thinks they are, Allah is the only True King.`,
    quiz: [
      {
        question: "What was Ibrahim's (AS) challenge to Namrud?",
        options: ["To win a fight", "To bring the sun from the West", "To build a tower"],
        correctAnswer: "To bring the sun from the West",
        type: "multiple"
      },
      {
        question: "How did Namrud feel after the challenge?",
        options: ["Happy", "Silenced and defeated", "He laughed"],
        correctAnswer: "Silenced and defeated",
        type: "multiple"
      },
      {
        question: "Why do some people become arrogant when they have power?",
        type: "open"
      }
    ]
  },
  {
    id: 27,
    title: "The Lord of Umar Sees Us",
    category: "History",
    description: "The story of the honest milkmaid and the grandmother of ‘Umar ibn Abdul Azeez.",
    image: "https://picsum.photos/seed/nature27/400/300",
    readTime: "5 min",
    content: `One night, while ‘Umar (RA) was walking through Madinah, he heard a mother and daughter talking. The mother said, "Mix the milk with water so we can sell more and make more money."

The daughter replied, "But the Caliph ‘Umar has forbidden us from doing that!" The mother said, "‘Umar is not here, he cannot see us!"

The daughter said something that ‘Umar never forgot: "If ‘Umar does not see us, the Lord of ‘Umar sees us!"

‘Umar was so impressed by this girl's honesty and Taqwa (God-consciousness) that he had his son marry her. Many years later, their great-grandson became the famous and just leader, ‘Umar ibn Abdul Azeez.

This story shows that being honest when no one is looking is the greatest kind of character, and Allah rewards it in ways that can change history.`,
    quiz: [
      {
        question: "What did the mother want to do to the milk?",
        options: ["Drink it all", "Mix it with water", "Give it away"],
        correctAnswer: "Mix it with water",
        type: "multiple"
      },
      {
        question: "Why did the daughter refuse to lie?",
        options: ["She was scared of ‘Umar", "She knew Allah was watching", "She didn't like water"],
        correctAnswer: "She knew Allah was watching",
        type: "multiple"
      },
      {
        question: "What does 'Taqwa' mean to you in your daily life?",
        type: "open"
      }
    ]
  },
  {
    id: 28,
    title: "Legs Like Uhud",
    category: "Companions",
    description: "The virtue and status of Abdullah ibn Mas’ood (RA) in the sight of Allah.",
    image: "https://picsum.photos/seed/nature28/400/300",
    readTime: "4 min",
    content: `Abdullah ibn Mas’ood (RA) was a very small and thin man. One day, he climbed a tree to pick something for the Prophet (SAW). When the wind blew, his thin legs were revealed, and some of the companions laughed at how small they were.

The Prophet (SAW) asked, "Why are you laughing?" They said, "At the thinness of his legs, O Messenger of Allah."

The Prophet (SAW) said, "By the One in Whose hand is my soul, those two legs will be heavier than Mount Uhud on the Scale of good deeds on the Day of Judgment!"

This story teaches us that Allah doesn't look at our height, our weight, or our looks. He looks at our hearts and our actions. A person who looks small to people might be a giant in the sight of Allah.`,
    quiz: [
      {
        question: "Why did the companions laugh at Ibn Mas'ood (RA)?",
        options: ["He told a joke", "Because his legs were very thin", "He fell out of the tree"],
        correctAnswer: "Because his legs were very thin",
        type: "multiple"
      },
      {
        question: "What did the Prophet (SAW) compare his legs to?",
        options: ["Mount Uhud", "A palm tree", "A sword"],
        correctAnswer: "Mount Uhud",
        type: "multiple"
      },
      {
        question: "How can we stop ourselves from judging people by their looks?",
        type: "open"
      }
    ]
  },
  {
    id: 29,
    title: "The Man Who Fed the Thirsty Cat",
    category: "Wisdom",
    description: "A story about the immense reward for kindness towards animals.",
    image: "https://picsum.photos/seed/nature29/400/300",
    readTime: "4 min",
    content: `Just as we learned about the man and the dog, there is another story about a person who found a thirsty cat. This person saw the cat suffering and, even though they were tired and had little water, they shared what they had with the small creature.

The Prophet (SAW) said that Allah forgave this person and granted them Paradise because of this one act of mercy. He taught us that "A woman was punished because of a cat which she kept locked up until it died of hunger... she neither fed it nor set it free to eat the vermin of the earth."

These stories show us that our character is tested by how we treat those who are smaller and weaker than us. Every act of kindness, no matter how small, is seen by Allah.`,
    quiz: [
      {
        question: "What was the reward for the person who helped the thirsty cat?",
        options: ["A gift from the king", "Paradise and forgiveness", "A new house"],
        correctAnswer: "Paradise and forgiveness",
        type: "multiple"
      },
      {
        question: "What happened to the woman who was unkind to her cat?",
        options: ["She was rewarded", "She was punished", "Nothing happened"],
        correctAnswer: "She was punished",
        type: "multiple"
      },
      {
        question: "Why is it important to be kind to animals in Islam?",
        type: "open"
      }
    ]
  },
  {
    id: 30,
    title: "The Prophet's (SAW) Kindness on Eid",
    category: "Prophets",
    description: "A beautiful story about how the Prophet (SAW) cared for an orphan on the day of Eid.",
    image: "https://picsum.photos/seed/nature30/400/300",
    readTime: "5 min",
    content: `On the morning of Eid, the Prophet (SAW) was walking to the prayer ground when he saw a young boy sitting by himself, crying. All the other children were wearing new clothes and playing happily with their parents.

The Prophet (SAW) stopped and asked, "Why are you crying, my child?" The boy replied, "My father was a soldier and he died, and now I have no one to buy me new clothes or celebrate Eid with."

The Prophet (SAW) took the boy's hand and said, "Would you not be happy if Muhammad was your father, Aisha was your mother, and Fatima was your sister?" The boy's face lit up with joy!

The Prophet (SAW) took him home, gave him new clothes, and fed him a delicious meal. The boy went out to play, and the other children asked, "Why are you so happy now?" He said, "I have the best family in the world!"`,
    quiz: [
      {
        question: "Why was the boy crying on Eid morning?",
        options: ["He lost his toy", "He was an orphan and had no one to celebrate with", "He was hungry"],
        correctAnswer: "He was an orphan and had no one to celebrate with",
        type: "multiple"
      },
      {
        question: "Who did the Prophet (SAW) say would be the boy's new mother?",
        options: ["Khadija", "Aisha", "Fatima"],
        correctAnswer: "Aisha",
        type: "multiple"
      },
      {
        question: "How can we help children who are lonely or sad during Ramadan and Eid?",
        type: "open"
      }
    ]
  }
];

const StorytellingSection: React.FC = () => {
  const { theme } = useTheme();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleListen = async () => {
    if (!selectedStory?.content) return;
    
    if (audioRef.current && audioRef.current.src) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play();
        setIsAudioPlaying(true);
      }
      return;
    }

    try {
      setIsGeneratingAudio(true);
      setAudioError(null);
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `Read this story in a warm, engaging, and storytelling voice suitable for children: ${selectedStory.title}. ${selectedStory.content}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const audioPart = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      const base64Audio = audioPart?.data;
      const mimeType = audioPart?.mimeType || 'audio/wav';
      
      if (base64Audio) {
        const byteCharacters = atob(base64Audio);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const audioBlob = new Blob([byteArray], { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          // Revoke old URL if it exists
          if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
            URL.revokeObjectURL(audioRef.current.src);
          }
          audioRef.current.src = audioUrl;
          audioRef.current.load();
          audioRef.current.play().catch(e => {
            if (e.name !== 'AbortError') {
              console.error("Playback failed:", e);
              setAudioError("Playback failed. Please try again.");
            }
          });
          setIsAudioPlaying(true);
        }
      } else {
        throw new Error("No audio data received");
      }
    } catch (err) {
      console.error("TTS Error:", err);
      setAudioError("Failed to generate audio. Please try again.");
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src) {
          URL.revokeObjectURL(audioRef.current.src);
        }
      }
    };
  }, [selectedStory]);

  if (selectedStory) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-4xl mx-auto p-8 rounded-[40px] border ${
          theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
        }`}
      >
        <button 
          onClick={() => {
            setSelectedStory(null);
            setQuizAnswers({});
          }}
          className="mb-8 flex items-center text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase hover:opacity-70 transition-opacity"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Library
        </button>

        <div className="aspect-video max-w-2xl mx-auto rounded-3xl overflow-hidden mb-12">
          <img 
            src={selectedStory.image} 
            alt={selectedStory.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-4 block">{selectedStory.category}</span>
              <h2 className={`font-serif text-5xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{selectedStory.title}</h2>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <button 
                onClick={handleListen}
                disabled={isGeneratingAudio}
                className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest uppercase transition-all duration-300 ${
                  isAudioPlaying 
                    ? 'bg-[#D4AF37] text-[#0a1128]' 
                    : theme === 'dark' 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                } ${isGeneratingAudio ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isGeneratingAudio ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : isAudioPlaying ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    Pause Story
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    Listen to Story
                  </>
                )}
              </button>
              {audioError && <span className="text-red-500 text-[10px] uppercase tracking-wider">{audioError}</span>}
            </div>
          </div>

          <audio 
            ref={audioRef} 
            onEnded={() => setIsAudioPlaying(false)}
            onPause={() => setIsAudioPlaying(false)}
            onPlay={() => setIsAudioPlaying(true)}
            className="hidden"
          />

          <div className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
            {selectedStory.content?.split('\n\n').map((para, i) => (
              <p key={i} className="text-slate-500 font-light leading-relaxed mb-6 text-xl">
                {para}
              </p>
            ))}
          </div>
        </div>

        {selectedStory.quiz && (
          <div className={`mt-20 p-12 rounded-[32px] ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
            <h3 className={`font-serif text-3xl mb-12 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Reflections & Quiz</h3>
            <div className="space-y-12">
              {selectedStory.quiz.map((q, i) => (
                <div key={i} className="space-y-6">
                  <p className={`text-lg font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                    {i + 1}. {q.question}
                  </p>
                  {q.type === 'multiple' ? (
                    <div className="grid gap-4">
                      {q.options?.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setQuizAnswers(prev => ({ ...prev, [i]: opt }))}
                          className={`p-6 rounded-2xl text-left transition-all duration-300 border ${
                            quizAnswers[i] === opt
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0a1128]'
                              : theme === 'dark'
                              ? 'bg-white/5 border-white/10 text-slate-400 hover:border-[#D4AF37]/50'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-[#D4AF37]/50'
                          }`}
                        >
                          {opt}
                          {quizAnswers[i] === opt && q.correctAnswer === opt && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-widest">Correct!</span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      placeholder="Write your reflection here..."
                      className={`w-full p-6 rounded-2xl min-h-[150px] transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${
                        theme === 'dark'
                          ? 'bg-white/5 border-white/10 text-white placeholder-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {STORIES.map((story) => (
        <div 
          key={story.id} 
          className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
            theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-[#D4AF37]/50' : 'bg-white border-slate-200 hover:border-[#D4AF37]/50'
          }`}
        >
          <div className="h-48 overflow-hidden">
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
          </div>
          
          <div className="p-8 relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase">{story.category}</span>
              <span className="text-slate-500 text-[10px] uppercase tracking-wider">{story.readTime} read</span>
            </div>
            <h3 className={`font-serif text-2xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{story.title}</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-2">{story.description}</p>
            
            <button 
              onClick={() => setSelectedStory(story)}
              className={`w-full py-4 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                theme === 'dark' ? 'bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0a1128]' : 'bg-slate-100 text-slate-600 hover:bg-[#D4AF37] hover:text-white'
              }`}
            >
              Read Story
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StorytellingSection;
