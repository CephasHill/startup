import React from 'react';

export function Library() {
  return (
    <main className="container page-shell">
      <div className="card content-panel accent-top p-4 p-md-5">
        <h2>Reading Library</h2>

      <section aria-labelledby="progress-heading">
        <h3 id="progress-heading" className="section-title mt-4">Your Progress</h3>
        <dl>
          <dt>Current plan</dt>
          <dd>5x5 Weekday Plan</dd>
          <dt>Reading streak</dt>
          <dd>7 days</dd>
          <dt>Today's progress</dt>
          <dd>1 of 5 chapters completed</dd>
        </dl>
        <progress className="w-100" value="1" max="5" aria-label="Reading Progress">1 of 5 chapters completed</progress>
      </section>

      <section aria-labelledby="settings-heading">
        <h3 id="settings-heading" className="section-title mt-4">Reading Settings</h3>
        <form className="row g-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label" for="reading-plan">Reading plan</label>
            <select className="form-select" id="reading-plan" name="reading-plan">
              <option>5x5 Weekday Plan</option>
              <option>90-Day Sprint</option>
            </select>
          </div>

          <div className="col-md-5">
            <label className="form-label" for="translation">Translation</label>
            <select className="form-select" id="translation" name="translation">
              <option>Berean Standard Bible</option>
              <option>King James Version</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">Save</button>
          </div>
        </form>
      </section>

      <section aria-labelledby="chapters-heading">
        <h3 id="chapters-heading" className="section-title mt-4">New Testament Chapters</h3>
        <div className="table-responsive">
          <table className="chapter-table table table-hover align-middle">
            <caption>Available chapters and reading status</caption>
            <thead>
              <tr>
                <th scope="col">Matthew</th>
                <th scope="col">Mark</th>
                <th scope="col">Luke</th>
                <th scope="col">John</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td><a href="john01.html">1</a></td>
              </tr>
              <tr>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
              </tr>
              <tr>
                <td>3</td>
                <td>3</td>
                <td>3</td>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="bookmarks-heading">
        <h3 id="bookmarks-heading" className="section-title mt-4">Saved Bookmarks</h3>
        <ul className="list-group">
          <li className="list-group-item">John 1:1 - saved verse placeholder</li>
          <li className="list-group-item">John 1:14 - saved verse placeholder</li>
        </ul>
      </section>
      </div>
    </main>
  );
}