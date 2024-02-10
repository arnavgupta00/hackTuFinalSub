// import React, { Fragment } from "react";
import Logo from "../../assets/Logo.png";
import styles from "./forum.module.css";
import Post from "./post/post.jsx";
// import Glass from '../../assets/glass.png';
import React, { Fragment, useEffect, useState } from "react";
// import Logo from '../../assets/Logo.png';
// import styles from './forum.module.css';
// import Post from './post/post.jsx';
import axios from "axios";
import Glass from "../../assets/glass.png";
import Navbar from "../../components/navbar/navbar.jsx";

// import Search from '../../assets/magnifying-glass.png';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const fetchposts = async () => {
    axios
      .get("/api/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    fetchposts();
  }, []);

  return (
    <Fragment>
      <div className={styles.mainn}>
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1>Forums!</h1>
          </div>
          <div className={styles.image}>
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="  Would this count as bullying?" />
        </div>
        <div className={styles.post}>
          {posts.map((post, index) => {
            return (
              <div key={index}>
                <Post props={post} />
              </div>
            );
          })}
        </div>
        {/* <div className={styles.ending}>
				<h3>Didn't find your answer?<br />Post your question!</h3>
				<img src={Glass} alt='glass'/>
			</div> */}
			
      </div>
	  <Navbar />
    </Fragment>
  );
};

export default Forum;
