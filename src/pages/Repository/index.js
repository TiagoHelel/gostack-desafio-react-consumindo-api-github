import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaSpinner } from 'react-icons/fa'
import api from '../../services/api'

import Container from '../../components/Container'
import { Loading, Owner, IssueList } from './styles'

// import { Container } from './styles';

export default class Repository extends Component {
    static propTypes = {
        march: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    }

    state = {
        repository: {},
        issues: [],
        loading: true,
        repoName: '',
        selected: 'all',
        page: 1,
    }

    async componentDidMount() {
        const { match } = this.props
        const repoName = decodeURIComponent(match.params.repository)
        const issuesState = decodeURIComponent(match.params.state)
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: issuesState,
                    per_page: 5,
                },
            }),
        ])
        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
            repoName,
        })
    }

    reloadOpen = async (state, page) => {
        const { repoName } = this.state
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state,
                    per_page: 5,
                    page,
                },
            }),
        ])
        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
            selected: state,
            page,
        })
    }

    render() {
        const {
            repository,
            issues,
            loading,
            repoName,
            selected,
            page,
        } = this.state
        if (loading) {
            return (
                <Loading>
                    <FaSpinner />
                </Loading>
            )
        }
        return (
            <Container>
                <Owner>
                    <Link to="/">Home Page</Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>
                <IssueList>
                    <header>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repoName
                            )}/open`}
                            onClick={() => this.reloadOpen('open', 1)}
                        >
                            {selected === 'open' ? (
                                <h1 className="selected">Open</h1>
                            ) : (
                                <h1>Open</h1>
                            )}
                        </Link>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repoName
                            )}/closed`}
                            onClick={() => this.reloadOpen('closed', 1)}
                        >
                            {selected === 'closed' ? (
                                <h1 className="selected">Closed</h1>
                            ) : (
                                <h1>Closed</h1>
                            )}
                        </Link>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repoName
                            )}/all`}
                            onClick={() => this.reloadOpen('all', 1)}
                        >
                            {selected === 'all' ? (
                                <h1 className="selected">All</h1>
                            ) : (
                                <h1>All</h1>
                            )}
                        </Link>
                    </header>
                    {issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                    <h1>
                        <div>
                            <p>Page {page}</p>
                        </div>
                        <div className="pagination">
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repoName
                                )}/${selected}`}
                                onClick={() =>
                                    this.reloadOpen(selected, page - 1)
                                }
                            >
                                {page === 1 ? false : <span>Previous </span>}
                            </Link>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repoName
                                )}/${selected}`}
                                onClick={() =>
                                    this.reloadOpen(selected, page + 1)
                                }
                            >
                                <span>Next</span>
                            </Link>
                        </div>
                    </h1>
                </IssueList>
            </Container>
        )
    }
}
