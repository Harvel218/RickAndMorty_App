import gql from 'graphql-tag';

export const GET_CHARACTERS = gql`
    query getCharacters($page: Int!, $name: String!) {
        characters(page: $page, filter: { name: $name }) {
            info {
                count
                pages
            }
            results {
                id
                name
                image
                gender
                species
                episode {
                    episode
                }
            }
        }
        location(id: 1) {
            id
        }
        episodesByIds(ids: [1, 2]) {
            id
        }
    }
`;
