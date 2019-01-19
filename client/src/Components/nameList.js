import React from 'react';

export default (props) => {
    return (
            props.name.map(n =>
                <div className="jumbotron p-1 my-1" key={n}>
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <h5>{n}</h5>
                        </div>
                    </div>
                </div>
            )
    )
}