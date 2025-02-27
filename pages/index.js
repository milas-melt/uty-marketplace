import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMoralisQuery, useMoralis} from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {

    const {isWeb3Enabled} = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
      // TableName
      // Function for the query
      "ActiveItem",
      // only the last 10 NFTs
      (query) => query.limit(10).descending("tokenId")
      // for different pages:(query) => query.limit(10).descending("tokenId").skip(PAGE_NUMBER)
      )
      console.log(listedNfts)
      
    return (
    <div className="container mx-auto">
      <h1 className='py-4 px-4 font-bold text-2xl'>Recently Listed</h1>
      <div className='flex flex-wrap'>

        {
        isWeb3Enabled ? (
        fetchingListedNfts ? (<div>Loading...</div>) : listedNfts.map((nft) => {
          console.log(nft.attributes)
          const {price, nftAddress, tokenId, marketplaceAddress, seller} = nft.attributes
          return (
            <div>
              <NFTBox
                price = {price}
                nftAddress = {nftAddress}
                tokenId = {tokenId}
                marketplaceAddress = {marketplaceAddress}
                seller = {seller}
                key = {`${nftAddress}${tokenId}`}
              />
            </div>
          )
        })
        ) : <div>Web3 currently not enabled</div>
      }
      </div>
    </div>
  )
}
