

export const pagination = (currentPage, pokemonFilter) => {

    const pokemonsPerPage = 15

    const sliceStart = (currentPage - 1) * pokemonsPerPage
    const sliceEnd = currentPage * pokemonsPerPage
    const pokemonInPage = pokemonFilter.slice(sliceStart, sliceEnd)
    
    const lastPage = Math.ceil(pokemonFilter.length / pokemonsPerPage)

    const pagePerBlock = 5
    const actualBlock = Math.ceil(currentPage / pagePerBlock) 

    const pagesInBlock = []
    const minPage = (actualBlock * pagePerBlock - pagePerBlock) + 1
    const maxPage = actualBlock * pagePerBlock
    for(let i = minPage; i <= maxPage; i++){
        if(i <= lastPage ){
            pagesInBlock.push(i)
        }
    }

    return {pagesInBlock, lastPage, pokemonInPage}
    
}