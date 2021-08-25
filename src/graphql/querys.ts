import gql from 'graphql-tag';

export const GET_CHARACTERS_BY_NAME = gql`
    query getCharacters($page: Int!, $value: String!) {
        characters(page: $page, filter: { name: $value }) {
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
