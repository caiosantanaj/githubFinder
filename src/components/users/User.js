import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';

class User extends Component {
  componentDidMount() {
    // match.params.login => Refere-se a path='/user/:login'
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  render() {
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
    } = this.props.user;

    const { loading, repos } = this.props;

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
  }
}

User.protoType = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

export default User;
