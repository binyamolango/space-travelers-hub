import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import style from './Missions.module.css';
import { joinMission, getAllMissions } from '../../redux/mission/MissionsSlice';

const Missions = () => {
  const { allMissions, loading, error } = useSelector((store) => store.allMissions);
  const dispatch = useDispatch();
  const leaveMission = {
    color: '#ea0000',
    borderColor: '#ea0000',
    outlineColor: '#ea0000',
  };

  useEffect(() => {
    if (allMissions.length === 0) {
      dispatch(getAllMissions());
    }
  }, [dispatch, allMissions.length]);
  if (allMissions.length !== 0) {
    return (
      <Container>
        <section className={style.mission_section}>
          <table className={style.table}>
            <thead>
              <tr className={style.row}>
                <th className={style.column}>Mission</th>
                <th className={style.column}>Description</th>
                <th className={style.column}>Status</th>
                <th className={style.column}>{ ' '}</th>
              </tr>
            </thead>
            <tbody>
              {allMissions.map((m) => (
                <tr key={m.mission_id}>
                  <td className={style.cell}>{m.mission_name}</td>
                  <td className={style.cell}>{m.description}</td>
                  <td className={style.cell}>
                    {m.joined ? (
                      <span className={style.member}>Active Member</span>
                    ) : (<span className={style.notmember}>NOT A MEMBER</span>)}
                  </td>
                  <td className={style.cell}>
                    <button type="button" className={style.joinMissions} style={m.joined ? leaveMission : null} onClick={() => dispatch(joinMission(m.mission_id))}>
                      {m.joined ? (
                        'Leave Mission'
                      ) : ('Join Mission')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Container>
    );
  }

  if (loading) {
    return (
      <p> Missions are loading!</p>
    );
  }
  if (error) {
    return (
      <p>Something is incorrect!</p>
    );
  }
  return (
    <p>Missions are not available.</p>
  );
};

export default Missions;
