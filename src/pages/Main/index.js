import React, { Component } from 'react'
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Container from '../../components/Container'
import { Form, SubmitButton, List } from './styles'

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: false,
    }

    // Carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories')
        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) })
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({ loading: true })
        const { newRepo, repositories } = this.state
        const existsRepo = repositories.findIndex(r => r.name === newRepo) >= 0
        try {
            if (existsRepo) {
                throw new Error('Repositório duplicado')
            }
            const response = await api.get(`repos/${newRepo}`)
            const data = {
                name: response.data.full_name,
            }
            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                loading: false,
                error: false,
            })
        } catch {
            this.setState({
                error: true,
                loading: false,
            })
        }
    }

    render() {
        const { newRepo, repositories, loading, error } = this.state
        return (
            <Container>
                <h1>
                    <FaGithub />
                    Repositórios
                </h1>
                <Form onSubmit={this.handleSubmit}>
                    {error ? (
                        <input
                            className="error"
                            type="text"
                            placeholder="Adicionar repositório"
                            value={newRepo}
                            onChange={this.handleInputChange}
                        />
                    ) : (
                        <input
                            type="text"
                            placeholder="Adicionar repositório"
                            value={newRepo}
                            onChange={this.handleInputChange}
                        />
                    )}
                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}/all`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        )
    }
}

// rocketseat/unform
