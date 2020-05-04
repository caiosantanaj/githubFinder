/* eslint-disable react/prop-types */
import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Repos from '../repos/Repos';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, getUserRepos, loading, user, repos } = githubContext;

  useEffect(() => {
    // match.params.login => Refere-se a path='/user/:login'
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url: avatarUrl,
    location,
    bio,
    blog,
    company,
    login,
    html_url: htmlUrl,
    followers,
    following,
    public_repos: publicRepos,
    public_gists: publicGists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to search
      </Link>
      Hireable :{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatarUrl}
            alt={`${name} github`}
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          {location && (
            <Fragment>
              <p>Location: {location}</p>
            </Fragment>
          )}
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={htmlUrl} className='btn btn-dark my-1'>
            Visit GitHub profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong>
                  {login}
                </Fragment>
              )}
            </li>

            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong>
                  {company}
                </Fragment>
              )}
            </li>

            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-dange'>Public Repos: {publicRepos}</div>
        <div className='badge badge-dark'>Public Gists: {publicGists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

// User.protoType = {
//   getUserRepos: PropTypes.func.isRequired,
//   repos: PropTypes.array.isRequired,
// };

export default User;
