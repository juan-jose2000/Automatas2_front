const Table = (props) => {

    const { AFD } = props;

    const columns = AFD.alphabet.map((alpha) => <th scope="col">{alpha}</th>);
    const rows = AFD.states.map((state, i) => {

        const transitions = [];
        for (const key in AFD.transitions[i]) {
            const transition = AFD.transitions[i][key];
            transitions.push(<td>{transition}</td>);
        }
        let stateRow = <th scope="row">{state}</th>

        for (let i = 0; i < AFD.acceptanceStates.length; i++) {
            const acceptanceState = AFD.acceptanceStates[i];

            if (state === AFD.initialState) {
                stateRow = <th scope="row">->{state}</th>
            }

            if (state === acceptanceState) {
                stateRow = <th scope="row">*{state}</th>
            }
        }

        return (
            <tr key={i}>
                {stateRow}
                {transitions}
            </tr>
        );
    });

    return (
        <>
            <table className="table table-dark table-striped mt-4">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        {columns}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    );
}

export default Table;