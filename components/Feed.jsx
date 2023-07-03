'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
    );
};

const Feed = () => {

  const [allPosts, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
   
    setSearchTimeout(
      setTimeout(() => {
      // Filter the posts based on the search text
      const filteredPosts = allPosts.filter(post =>
        post.prompt.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.tag.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.creator.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
    setPosts(filteredPosts);
    }, 500)
  );
};

const handleTagClick = (tag) => {
  const filteredPosts = allPosts.filter(post =>
    post.tag.toLowerCase() === tag.toLowerCase()
  );

  setPosts(filteredPosts);
};


useEffect(() => {
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    
    setAllPosts(data); // Update the allPosts state
    setPosts(data); // Update the posts state
  }

  fetchPosts();
}, []);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
       />
    </section>
  )
}

export default Feed