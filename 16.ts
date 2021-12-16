export function partOne(input: string) {
  const binary = getBinaryFromHexadecimal(input);
  return parsePacket(binary)[1];
}

export function partTwo(input: string) {
  const binary = getBinaryFromHexadecimal(input);
  return parsePacket(binary)[0];
}

function getBinaryFromHexadecimal(hexadecimal: string) {
  return hexadecimal
    .split("")
    .map((hex) => parseInt(hex, 16).toString(2).padStart(4, "0"))
    .join("");
}

function parsePacket(binary: string) {
  let version = parseInt(binary.slice(0, 3), 2);
  const typeId = parseInt(binary.slice(3, 6), 2);

  let value = 0;
  let position = 0;

  if (typeId === 4) {
    position = 6;
    binary = binary.slice(6);
    let more = true;
    while (more) {
      more = binary[0] === "1";
      value = value * 16 + parseInt(binary.slice(1, 5), 2);
      position += 5;
      binary = binary.slice(5);
    }
    return [value, version, position];
  }

  const lengthTypeID = binary[6];
  const subValues: number[] = [];

  if (lengthTypeID === "0") {
    const length = parseInt(binary.slice(7, 22), 2);
    let packet = binary.slice(22, 22 + length);
    while (packet.length) {
      const packetValue = parsePacket(packet);
      subValues.push(packetValue[0]);
      version += packetValue[1];
      packet = packet.slice(packetValue[2]);
    }
    position += 22 + length;
  } else {
    const packets = parseInt(binary.slice(7, 18), 2);
    position = 18;
    let packet = binary.slice(18);
    for (let i = 0; i < packets; i++) {
      const packetValue = parsePacket(binary.slice(position));
      subValues.push(packetValue[0]);
      version += packetValue[1];
      position += packetValue[2];
      packet = packet.slice(packetValue[2]);
    }
  }

  if (typeId === 0) {
    value = subValues.reduce((acc, curr) => acc + curr, 0);
  } else if (typeId === 1) {
    value = subValues.reduce((acc, curr) => acc * curr, 1);
  } else if (typeId === 2) {
    value = Math.min(...subValues);
  } else if (typeId === 3) {
    value = Math.max(...subValues);
  } else if (typeId === 5) {
    value = subValues[0] > subValues[1] ? 1 : 0;
  } else if (typeId === 6) {
    value = subValues[0] < subValues[1] ? 1 : 0;
  } else if (typeId === 7) {
    value = subValues[0] === subValues[1] ? 1 : 0;
  }

  return [value, version, position];
}
