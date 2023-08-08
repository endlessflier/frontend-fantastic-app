const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app';

const parseActivity = (obj) => {
  return {
    id: obj.id,
    callType: obj.call_type,
    direction: obj.direction,
    from: obj.from,
    to: obj.to,
    archived: obj.is_archived,
    duration: obj.duration,
    via: obj.via,
    createdAt: obj.created_at,
  };
};

export async function fetchActivities() {
  try {
    const result = await (await fetch(`${BASE_URL}/activities`)).json();
    return result.map(parseActivity);
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function fetchActivity(id) {
  try {
    const result = await (await fetch(`${BASE_URL}/activities/${id}`)).json();
    return parseActivity(result);
  } catch (err) {
    console.error(err);
  }
  return {};
}

export async function patchActivities(data, isArchived) {
  try {
    await Promise.all(
      data.map(async (call) => {
        const requestBody = {
          is_archived: isArchived,
        };

        const requestOptions = {
          method: 'PATCH',
          body: JSON.stringify(requestBody),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        };

        await fetch(`${BASE_URL}/activities/${call.id}`, requestOptions);
      }),
    );
    return 'success';
  } catch (err) {
    console.error(err);
  }
  return 'failed';
}
