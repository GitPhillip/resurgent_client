import React from 'react'

export default function LogHistory() {
    return (
        <div class="container mt-8 mb-8">
            <div class="row">
                <div class="col-md-9 offset-md-1">
                    <h4>Log History</h4><br/>
                    <ul class="timeline">
                        <li>
                            <h6 class='text-info'>New Web Design</h6>
                            <p>21 March, 2014</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula....</p>
                        </li>
                        <li>
                        <h6 class='text-info'>21 000 Job Seekers</h6>
                            <p>4 March, 2014</p>
                            <p>Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
                        </li>
                        <li>
                        <h6 class='text-info'>Awesome Employers</h6>
                            <p>1 April, 2014</p>
                            <p>Fusce ullamcorper ligula sit amet quam accumsan aliquet. Sed nulla odio, tincidunt vitae nunc vitae, mollis pharetra velit. Sed nec tempor nibh...</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
