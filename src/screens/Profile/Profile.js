import AccountLine from "../../components/AccountLine";
import "./Profile.css";

export default function UserProfile() {
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountLine title="Checking (x8349)" amount={2082.79} description="Available Balance" />
      <AccountLine title="Savings (x6712)" amount={10928.42} description="Available Balance" />
      <AccountLine title="Credit Card (x8349)" amount={184.3} description="Current Balance" />
    </main>
  );
}
